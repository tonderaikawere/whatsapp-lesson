import { NextRequest, NextResponse } from 'next/server';

// Strict dash cleaner
function cleanOutput(text: string): string {
  return text.replace(/[—–]/g, ':').trim();
}

// Live web search using Wikipedia APIs
async function searchWebKnowledge(query: string): Promise<string | null> {
  try {
    const cleanTerm = query
      .replace(/^(who is|what is|what are|where is|tell me about|explain|define|how does|what's|whats)\s+/i, '')
      .replace(/[?!.]+$/, '')
      .trim();

    if (!cleanTerm) return null;

    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanTerm)}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl, { signal: AbortSignal.timeout(3500) });
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const firstHit = searchData?.query?.search?.[0];
    if (!firstHit?.title) return null;

    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstHit.title)}`;
    const summaryRes = await fetch(summaryUrl, { signal: AbortSignal.timeout(3500) });
    if (!summaryRes.ok) return null;
    const summaryData = await summaryRes.json();
    if (summaryData?.extract && summaryData.extract.length > 20) {
      return `**${summaryData.title}**\n\n${summaryData.extract}`;
    }
  } catch {
    // Fail gracefully
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contactId = 'ai-assistant', message = '' } = body;
    const raw = String(message || '').trim();
    const lower = raw.toLowerCase();

    // 1. Live Date & Time Queries
    if (/(what\s*is\s*the\s*date|date\s*today|today'?s\s*date|what\s*day\s*is\s*it|current\s*date|what\s*date|todya)/i.test(lower)) {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

    // 3. Conversational quick replies
    if (/^(hi|hello|hey|yo|greetings|hie)$/i.test(lower)) {
      return NextResponse.json({
        text: cleanOutput('Hello! How can I help you today?'),
      });
    }

    if (/^(how\s*are\s*you|how\s*r\s*u)$/i.test(lower)) {
      return NextResponse.json({
        text: cleanOutput("Thanks for asking! I'm doing well and ready to help. What can I assist you with today?"),
      });
    }

    if (/^(i have a question|i have a qustion|can i ask|can i ask you|may i ask)$/i.test(lower)) {
      return NextResponse.json({
        text: cleanOutput("Sure, go ahead! What's your question?"),
      });
    }

    // 4. Web Knowledge Search for ANY question like "what is X", "who is X", "tell me about X"
    const isSearchQuery = /^(who is|what is|what are|where is|tell me about|explain|define|how does|what's|whats)\b/i.test(lower) || lower.endsWith('?');
    if (isSearchQuery) {
      // If persona is Dev and asking about code, let Dev handler respond with code snippets
      if (contactId === 'dev' && /html|css|javascript|react|center a div/i.test(lower)) {
        return NextResponse.json({ text: null });
      }
      // If persona is School and asking about ZIMSEC grade, let School handler respond
      if (contactId === 'school' && /grade|zimsec|form\s*\d|o level|a level/i.test(lower)) {
        return NextResponse.json({ text: null });
      }

      const knowledge = await searchWebKnowledge(raw);
      if (knowledge) {
        return NextResponse.json({
          text: cleanOutput(knowledge),
        });
      }
    }

    // Return null to let the persona handler provide custom deep answers
    return NextResponse.json({ text: null });
  } catch (error) {
    return NextResponse.json({ text: null, error: String(error) });
  }
}
