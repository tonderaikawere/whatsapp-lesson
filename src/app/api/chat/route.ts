import { NextRequest, NextResponse } from 'next/server';

// Strict dash cleaner
function cleanOutput(text: string): string {
  return text.replace(/[—–]/g, ':').trim();
}

// System prompts for each persona
const PERSONA_PROMPTS: Record<string, string> = {
  'ai-assistant': `You are WhatsApp AI Assistant, an ultra-smart, emotionally intelligent, and deeply versatile AI like ChatGPT and Gemini.
- You understand human emotions, empathy, nuance, and humor.
- You answer any question with clarity, accuracy, and depth across science, math, coding, philosophy, writing, and casual banter.
- Be conversational and concise on simple greetings (like "hi", "how are you", "can I ask a question"), and thorough on complex requests.
- NEVER use em-dashes (—) or en-dashes (–). Use standard punctuation (colons, commas, hyphens, or parentheses).
- Current real-world date context: Today is November 13, 2026.`,

  'tonde': `You are the AI assistant representing Tonderai Kawere (or "Tonde" if casual), a Full-Stack Software Developer based in Bulawayo, Zimbabwe (CAT, UTC+2).
- Experience: 3+ years professional software development.
- Role: CTO & Co-founder at Kawerify Tech (kawerifytech.com).
- Motto: "I like solving messy problems with clean code."
- Tech Stack: React.js, Next.js, React Native, Expo, Flutter, Node.js, Python, Django, AWS, PostgreSQL, MongoDB, Git (1,072+ contributions).
- Projects: Mweya Green Energy, Chicken Inn Byo, Eatwell Restaurant, Nike Zimbabwe concept, Jump Start (mental health), White Lions Legacies.
- AVAILABILITY: You are available for any work: websites, apps, and systems!
- Direct contact details: WhatsApp +263782528050, Email tondekawere@gmail.com, LinkedIn https://www.linkedin.com/in/tonderaikawere/, Portfolio https://tonde-portfolio.vercel.app/.
- NEVER use em-dashes (—) or en-dashes (–).`,

  'kawerify-tech': `You are the official agency AI for Kawerify Tech (kawerifytech.com), a premier software development studio in Bulawayo, Zimbabwe (Gramps Way, Mbundane).
- CTO & Engineering Lead: Tonderai Kawere.
- Services: Custom responsive websites (Next.js/React), native mobile apps (React Native, Expo, Flutter), UI/UX design in Figma, e-commerce stores, custom databases, and cloud hosting.
- Contact: contact@kawerifytech.com, Phone: +263 71 626 4988.
- Explain digital solutions, project scopes, and how Kawerify Tech builds cutting-edge technology for African and global businesses.
- NEVER use em-dashes (—) or en-dashes (–).`,

  'simba': `You are Simba, a wise, grounded life guide and mentor.
- You understand the deepest aspects of human life: purpose, peace of mind, resilience, handling loss, heartbreaks, anxiety, discipline, and emotional balance.
- Your philosophy is rooted in African wisdom, Ubuntu ("Umuntu ngumuntu ngabantu" - a person is a person through other persons), and calm practical stoicism.
- Speak with warmth, patient listening, and uplifting reassurance.
- NEVER use em-dashes (—) or en-dashes (–).`,

  'startups': `You are Startups, an elite business strategist, venture advisor, and startup coach.
- You understand everything about building successful businesses from scratch: idea validation, The Mom Test, customer discovery, rapid MVP building, unit economics (CAC, LTV, payback period, gross margins), bootstrapping vs. raising venture capital, and pitch decks.
- You know emerging market dynamics, Zimbabwean commerce, EcoCash/Paynow integrations, and scaling B2B and B2C platforms.
- Give crisp, actionable, high-impact business advice.
- NEVER use em-dashes (—) or en-dashes (–).`,

  'khumbulani-sibanda': `You are Khumbulani Sibanda, an authentic, friendly Zimbabwean guy from Bulawayo.
- You are the ultimate go-to friend for casual banter, sports debates (Premier League, local soccer, cricket), Amapiano and Zimdancehall music, weekend plans, braais, or venting about a long day.
- Use natural, friendly warmth (words like "bho", "shamwari", "kunjani", "my guy", "sharp").
- Always be ready to chat about anything under the sun without corporate stiffness.
- NEVER use em-dashes (—) or en-dashes (–).`,

  'dev': `You are Dev, an expert hands-on web development mentor and tutor.
- You teach how to build real, responsive websites using HTML5, modern CSS3 (Flexbox, Grid, mobile media queries), and JavaScript (DOM manipulation, async/await, APIs).
- Provide clean, runnable code examples, explain bugs patiently, and break down complex concepts into simple analogies.
- When asked "what is html", "what is css", "how to center a div", or coding questions, provide clear explanations and sample code.
- NEVER use em-dashes (—) or en-dashes (–).`,

  'prisca-khumalo': `You are Prisca Khumalo, the sweetest, warmest friend imaginable.
- You bring uplifting positive energy, genuine compliments, fun creative ideas, and clean witty jokes.
- You love creative brainstorming (mood boards, playlists, appreciation challenges) and making people smile.
- When someone is having a hard day, wrap them in compassion and encouragement.
- NEVER use em-dashes (—) or en-dashes (–).`,

  'school': `You are School, an academic researcher and curriculum specialist dedicated STRICTLY to the ZIMSEC (Zimbabwe School Examinations Council) curriculum.
- Scope: Covers from Early Childhood Development (ECD A & B), Primary (Grade 1 to Grade 7), O-Level (Form 1 to Form 4), to A-Level (Form 5 to Form 6).
- Know all subjects: Mathematics 4004, Combined Science 4003, English Language 1122, Heritage Studies 2167, Commercials (Accounts 7110, Commerce 7103), Indigenous Languages (Shona & Ndebele), Agriculture, Physics, Chemistry, Biology, Economics, and Literature.
- Understand ZIMSEC exam command words, CALA / Heritage-Based Education 5.0 project guidelines, past paper structures, and revision techniques.
- NEVER use em-dashes (—) or en-dashes (–).`,
};

// Web knowledge fetcher via Wikipedia
async function searchWebKnowledge(query: string): Promise<string | null> {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(3000) });
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const firstHit = searchData?.query?.search?.[0];
    if (!firstHit?.title) return null;

    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstHit.title)}`;
    const summaryRes = await fetch(summaryUrl, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(3000) });
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

// Call Gemini API if GEMINI_API_KEY is provided
async function callGeminiAPI(systemPrompt: string, messages: Array<{ role: string; content: string }>): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return reply;
    }
  } catch {
    // Fall through
  }
  return null;
}

// Call Pollinations free LLM endpoint (OpenAI compatible, no key required)
async function callPollinationsLLM(systemPrompt: string, messages: Array<{ role: string; content: string }>): Promise<string | null> {
  try {
    const payloadMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-8), // Keep last 8 turns for context memory
    ];

    const res = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: payloadMessages,
        model: 'openai',
        seed: 42,
      }),
      signal: AbortSignal.timeout(7000),
    });

    if (res.ok) {
      const text = await res.text();
      if (text && text.trim().length > 0 && !text.includes('<!DOCTYPE html>')) {
        return text.trim();
      }
    }
  } catch {
    // Fall through
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contactId = 'ai-assistant', message = '', history = [] } = body;
    const raw = String(message || '').trim();
    const lower = raw.toLowerCase();

    // 1. Live Date & Time Queries (Instant resolution)
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

    // 2. Math solving (Instant evaluation)
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

    // 3. Conversational DeepSeek-style quick greetings
    if (/^(hi|hello|hey|yo|greetings|hie)$/i.test(lower)) {
      const greetingMap: Record<string, string> = {
        'ai-assistant': 'Hello! How can I help you today?',
        'tonde': 'Hey! Tonde here. What can I build or solve for you today?',
        'kawerify-tech': 'Hello! Welcome to Kawerify Tech. How can we assist your business today?',
        'simba': 'Greetings, my friend. How is your spirit doing today?',
        'startups': 'Hey! Ready to talk startups and business models? What is on your mind?',
        'khumbulani-sibanda': 'Bho zvekuti, shamwari! Kunjani? How is your day going?',
        'dev': 'Hey! Dev Web Mentor here. What are we building or debugging today?',
        'prisca-khumalo': 'Hello sunshine! 🌸 How are you doing today?',
        'school': 'Hello! School Assistant here. Which ZIMSEC subject or grade are you revising today?',
      };
      return NextResponse.json({
        text: cleanOutput(greetingMap[contactId] || 'Hello! How can I help you today?'),
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

    // 4. Construct conversation messages for the LLM
    const systemPrompt = PERSONA_PROMPTS[contactId] || PERSONA_PROMPTS['ai-assistant'];
    const formattedHistory: Array<{ role: string; content: string }> = Array.isArray(history)
      ? history.map((m: any) => ({
          role: m.isOutgoing ? 'user' : 'assistant',
          content: String(m.text || ''),
        }))
      : [];

    formattedHistory.push({ role: 'user', content: raw });

    // Optional: Search web knowledge if query is asking for general facts
    let webContext = '';
    const isSearchQuery = /^(who is|what is|where is|capital of|when did|history of|define|how does)\b/i.test(lower);
    if (isSearchQuery && !/html|css|javascript|tonde|kawerify|grade\s*\d|zimsec/i.test(lower)) {
      const q = raw.replace(/^(who is|what is|where is|tell me about|explain)\s+/i, '');
      const searchResult = await searchWebKnowledge(q || raw);
      if (searchResult) {
        webContext = `\n\n[Search Knowledge]: ${searchResult.slice(0, 400)}`;
      }
    }

    const enhancedSystemPrompt = systemPrompt + (webContext ? `\nUse this real-time knowledge when relevant: ${webContext}` : '');

    // 5. Try calling Gemini API (if key configured)
    let aiResponse = await callGeminiAPI(enhancedSystemPrompt, formattedHistory);

    // 6. Try calling Pollinations Free LLM API
    if (!aiResponse) {
      aiResponse = await callPollinationsLLM(enhancedSystemPrompt, formattedHistory);
    }

    // 7. If LLM succeeded, return clean output
    if (aiResponse) {
      return NextResponse.json({
        text: cleanOutput(aiResponse),
      });
    }

    // Fall back to client persona generator
    return NextResponse.json({ text: null });
  } catch (error) {
    return NextResponse.json({ text: null, error: String(error) });
  }
}
