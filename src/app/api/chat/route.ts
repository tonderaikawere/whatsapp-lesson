import { NextRequest, NextResponse } from 'next/server';

// Helper to remove any dashes like — or –
function cleanOutput(text: string): string {
  return text.replace(/[—–]/g, ':').trim();
}

// Live web search using Wikipedia Summary API
async function searchWebKnowledge(query: string): Promise<string | null> {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const firstHit = searchData?.query?.search?.[0];
    if (!firstHit?.title) return null;

    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstHit.title)}`;
    const summaryRes = await fetch(summaryUrl, { next: { revalidate: 3600 } });
    if (!summaryRes.ok) return null;
    const summaryData = await summaryRes.json();
    if (summaryData?.extract) {
      return summaryData.extract;
    }
  } catch {
    // Fail gracefully
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contactId, message } = body;
    const raw = (message || '').trim();
    const lower = raw.toLowerCase();

    // 1. Live Date & Time queries (like in user screenshot)
    if (/(what\s*is\s*the\s*date|date\s*today|today'?s\s*date|what\s*day\s*is\s*it|current\s*date|what\s*date|todya)/i.test(lower)) {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', options);
      return NextResponse.json({
        text: cleanOutput(`Today's date is **${formattedDate}**.`),
      });
    }

    if (/(what\s*time\s*is\s*it|current\s*time|what\s*is\s*the\s*time)/i.test(lower)) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return NextResponse.json({
        text: cleanOutput(`The current time is **${timeStr}**.`),
      });
    }

    // 2. Math solving
    const mathCandidate = raw.replace(/[^-()\d/*+.]/g, '').trim();
    if (/^[-+/*.\d\s()]+$/.test(mathCandidate) && /[0-9]/.test(mathCandidate) && /[+*/-]/.test(mathCandidate)) {
      try {
        const fn = new Function(`"use strict"; return (${mathCandidate});`);
        const result = fn();
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
          return NextResponse.json({
            text: cleanOutput(`${mathCandidate} = **${result}**`),
          });
        }
      } catch {}
    }

    // 3. Conversational greetings & questions (DeepSeek style: intentional, concise, not bloated)
    if (/^(hi|hello|hey|yo|greetings|hie)\b/i.test(lower)) {
      return NextResponse.json({
        text: cleanOutput('Hello! How can I help you today?'),
      });
    }

    if (/^how\s*are\s*you\b/i.test(lower) || /^how\s*r\s*u\b/i.test(lower)) {
      return NextResponse.json({
        text: cleanOutput("Thanks for asking! I'm doing well and ready to help. What can I assist you with today?"),
      });
    }

    if (/^(i have a question|i have a qustion|can i ask|can i ask you|may i ask)/i.test(lower)) {
      return NextResponse.json({
        text: cleanOutput("Sure, go ahead! What's your question?"),
      });
    }

    // 4. Web search for general knowledge queries
    const isSearchQuery = /^(who is|what is|what are|where is|capital of|when did|history of|how does|define|explain)/i.test(lower);
    if (isSearchQuery) {
      // Exclude persona specific queries
      const isPersonaSpecific = /html|css|javascript|tonde|kawerify|grade|zimsec|form\s*\d/i.test(lower);
      if (!isPersonaSpecific) {
        const searchQuery = raw.replace(/^(who is|what is|what are|where is|tell me about|explain)\s+/i, '');
        const knowledge = await searchWebKnowledge(searchQuery || raw);
        if (knowledge) {
          // Format concisely
          const concise = knowledge.split('\n')[0].slice(0, 350);
          return NextResponse.json({
            text: cleanOutput(concise),
          });
        }
      }
    }

    // Return null to let the persona handler provide customized deep answers
    return NextResponse.json({ text: null });
  } catch (error) {
    return NextResponse.json({ text: null, error: String(error) });
  }
}
