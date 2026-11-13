export interface BotReply {
  text: string;
  delayMs?: number;
}

// Normalize common typos and slang
function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[—–]/g, ':') // Replace em/en dashes
    .replace(/\bhtl\b/g, 'html')
    .replace(/\bhtm\b/g, 'html')
    .replace(/\bcsss\b/g, 'css')
    .replace(/\bjavascrip\b/g, 'javascript')
    .replace(/\bjs\b/g, 'javascript')
    .replace(/\brect\b/g, 'react')
    .replace(/\bstatup\b/g, 'startup')
    .replace(/\bzimsc\b/g, 'zimsec')
    .replace(/\bgread\b/g, 'grade')
    .replace(/\bqustion\b/g, 'question')
    .replace(/\btodya\b/g, 'today')
    .replace(/\bwat\b/g, 'what')
    .replace(/\bwats\b/g, 'what is')
    .replace(/\bu\b/g, 'you')
    .replace(/\br\b/g, 'are')
    .trim();
}

// Math evaluation helper
function tryEvaluateMath(input: string): string | null {
  const clean = input.replace(/[^-()\d/*+.]/g, '').trim();
  if (/^[-+/*.\d\s()]+$/.test(clean) && /[0-9]/.test(clean) && /[+*/-]/.test(clean)) {
    try {
      const fn = new Function(`"use strict"; return (${clean});`);
      const res = fn();
      if (typeof res === 'number' && !isNaN(res) && isFinite(res)) {
        return `${clean} = **${res}**`;
      }
    } catch {}
  }
  return null;
}

// Date helper
function getLiveDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return `Today's date is **${now.toLocaleDateString('en-US', options)}**.`;
}

// Time helper
function getLiveTime(): string {
  const now = new Date();
  return `The current time is **${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}**.`;
}

// Live Knowledge Search via Wikipedia API (Client-side & Server-side compatible with CORS)
async function searchWebKnowledge(query: string): Promise<string | null> {
  try {
    const cleanTerm = query
      .replace(/^(who is|what is|what are|where is|tell me about|explain|define|how does|what's|whats)\s+/i, '')
      .replace(/[?!.]+$/, '')
      .trim();

    if (!cleanTerm) return null;

    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanTerm)}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const firstHit = searchData?.query?.search?.[0];
    if (!firstHit?.title) return null;

    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstHit.title)}`;
    const summaryRes = await fetch(summaryUrl);
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

// ==========================================
// 1. AI ASSISTANT (DeepSeek & ChatGPT style)
// ==========================================
async function handleAIAssistant(text: string): Promise<string> {
  const norm = normalizeQuery(text);

  // Live date & time
  if (/(what\s*is\s*the\s*date|date\s*today|today'?s\s*date|what\s*day\s*is\s*it|current\s*date|what\s*date)/i.test(norm)) {
    return getLiveDate();
  }
  if (/(what\s*time\s*is\s*it|current\s*time|what\s*is\s*the\s*time)/i.test(norm)) {
    return getLiveTime();
  }

  // Math calculation
  const mathRes = tryEvaluateMath(text);
  if (mathRes) return mathRes;

  // DeepSeek style natural flow
  if (/^(i have a question|can i ask|can i ask you|may i ask)/i.test(norm)) {
    return "Sure, go ahead! What's your question?";
  }

  if (/^how\s*are\s*you\b/i.test(norm) || /^how\s*r\s*u\b/i.test(norm)) {
    return "Thanks for asking! I'm doing well and ready to help. What can I assist you with today?";
  }

  if (/^(hi|hello|hey|yo|greetings|hie)\b/i.test(norm)) {
    return "Hello! How can I help you today?";
  }

  if (/^(who are you|what is your name|what do you do|what can you do)/i.test(norm)) {
    return "I am your AI Assistant, here to answer questions, explain concepts, search knowledge, solve math, write code, or just chat with you. What would you like to explore?";
  }

  if (/feel\s*(sad|down|depressed|tired|lonely|anxious|stressed|hopeless|bad)/i.test(norm)) {
    return "I hear you, and it is completely okay to feel that way. Be kind to yourself today and take things one step at a time. If you want to talk through what is on your mind, I am right here listening.";
  }

  if (/thank|thanks|appreciate/i.test(norm)) {
    return "You're welcome! Let me know if you need anything else.";
  }

  if (/joke|make me laugh|funny/i.test(norm)) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "Why was the math book sad? Because it had too many problems!",
      "What did the ocean say to the beach? Nothing, it just waved!",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (/capital of/i.test(norm)) {
    if (/zimbabwe/i.test(norm)) return "The capital of Zimbabwe is Harare.";
    if (/south africa/i.test(norm)) return "South Africa has three capitals: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial).";
    if (/france/i.test(norm)) return "The capital of France is Paris.";
    if (/australia/i.test(norm)) return "The capital of Australia is Canberra.";
    if (/japan/i.test(norm)) return "The capital of Japan is Tokyo.";
    if (/kenya/i.test(norm)) return "The capital of Kenya is Nairobi.";
  }

  // Live Knowledge Search for ANY question like "what is olive", "what is google", "what is html", etc.
  const webResult = await searchWebKnowledge(text);
  if (webResult) {
    return webResult;
  }

  return `I understand you are asking about "${text}". What specific question or detail would you like to know about it?`;
}

// ==========================================
// 2. TONDE (Developer & Hire)
// ==========================================
function handleTonde(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(hi|hello|hey|hie)/i.test(norm)) {
    return "Hey! Tonde here. How can I help you today?";
  }

  if (/^(how are you|how r u)/i.test(norm)) {
    return "I'm doing well, thanks! Building clean software solutions. What can I help you with?";
  }

  if (/^(can i ask|i have a question)/i.test(norm)) {
    return "Yes, go right ahead! What's on your mind?";
  }

  if (/who are you|who is tonde|about you/i.test(norm)) {
    return `I am Tonderai Kawere (or Tonde if casual), a Full-Stack Software Developer based in Bulawayo, Zimbabwe with 3+ years of professional engineering experience.

I build websites, mobile apps, and custom systems.
Motto: "I like solving messy problems with clean code."

Reach me directly:
• WhatsApp: +263782528050
• Email: tondekawere@gmail.com
• Portfolio: https://tonde-portfolio.vercel.app/`;
  }

  if (/hire|work|job|available|contract|freelance|build|price|cost|quote|website|app/i.test(norm)) {
    return `Yes! Am available for any work: websites, apps, and systems!

• WhatsApp: +263782528050
• Email: tondekawere@gmail.com
• LinkedIn: https://www.linkedin.com/in/tonderaikawere/
• Portfolio: https://tonde-portfolio.vercel.app/

Send me a message on WhatsApp with your project requirements and I will get back to you promptly!`;
  }

  if (/stack|tech|skills|technologies|react|expo|next|node/i.test(norm)) {
    return `My technical stack includes:
• Frontend: React.js, Next.js, TypeScript, Material UI, Tailwind CSS
• Mobile: React Native, Expo (iOS & Android from one codebase), Flutter
• Backend: Node.js, Express, Python, Django, Firebase
• Databases: PostgreSQL, MongoDB, Firestore
• Cloud: AWS, Vercel, Git (1,072+ GitHub contributions in the past year)

Available for projects! Contact: +263782528050`;
  }

  if (/project|portfolio|mweya|chicken inn|eatwell|nike/i.test(norm)) {
    return `Key projects I've built include:
1. Mweya Green Energy: Sustainability clean energy platform
2. Chicken Inn Byo: Real restaurant ordering system for the beloved Zimbabwe brand
3. Eatwell Restaurant: Hospitality ordering and table management
4. Nike Zimbabwe: E-commerce concept store

Check them out at https://tonde-portfolio.vercel.app/`;
  }

  return `Am available for any work: websites, apps, and systems! Reach me directly on WhatsApp at +263782528050 or email tondekawere@gmail.com.`;
}

// ==========================================
// 3. KAWERIFY TECH (Studio Info & Agency Solutions)
// ==========================================
function handleKawerifyTech(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(hi|hello|hey|hie)/i.test(norm)) {
    return "Hello! Welcome to Kawerify Tech. How can we assist your business today?";
  }

  if (/^(how are you|how r u)/i.test(norm)) {
    return "We're doing great, helping companies build scalable software! How can we help you today?";
  }

  if (/service|what do you do|offer|build/i.test(norm)) {
    return `Kawerify Tech provides:
• Custom Website & Web App Development (React, Next.js)
• Mobile App Development (iOS & Android with Expo/React Native)
• E-Commerce & Payment Gateways (EcoCash, Paynow, Stripe)
• Custom Business Databases & Automation

Website: https://kawerifytech.com
Email: contact@kawerifytech.com | Phone: +263 71 626 4988`;
  }

  if (/location|address|where|office|contact/i.test(norm)) {
    return `Our studio is located at Gramps Way, Mbundane, Bulawayo, Zimbabwe.
Website: https://kawerifytech.com
Email: contact@kawerifytech.com
Phone: +263 71 626 4988`;
  }

  return "Welcome to Kawerify Tech! We engineer custom websites, mobile apps, and business software. Visit us at https://kawerifytech.com or call +263 71 626 4988.";
}

// ==========================================
// 4. SIMBA (Life Guide & Philosophy)
// ==========================================
function handleSimba(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(hi|hello|hey|hie)/i.test(norm)) {
    return "Greetings, my friend. How is your spirit doing today?";
  }

  if (/^(how are you|how r u)/i.test(norm)) {
    return "I am at peace, grounded, and thankful for today. How are you holding up?";
  }

  if (/^(can i ask|i have a question)/i.test(norm)) {
    return "Always, my friend. What is on your heart? Speak freely.";
  }

  if (/who are you|what do you do/i.test(norm)) {
    return "I am Simba, your life guide. I am here to share grounded wisdom about finding purpose, dealing with adversity, and living with inner peace.";
  }

  if (/sad|depressed|hard|pain|fail|struggle/i.test(norm)) {
    return "Take a deep breath. A tree grows its deepest roots during storms, not on calm sunny days. Do not judge your entire story by one difficult chapter. What is weighing most on you right now?";
  }

  if (/purpose|meaning/i.test(norm)) {
    return "Purpose is found in three things: doing work that challenges you, loving the people around you, and leaving others better than you found them. In Ubuntu: 'Umuntu ngumuntu ngabantu' (A person is a person through other persons).";
  }

  return "Life reflects back what you put into it with patience and integrity. What are your thoughts on this?";
}

// ==========================================
// 5. STARTUPS (Business, MVPs, Funding)
// ==========================================
function handleStartups(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(hi|hello|hey|hie)/i.test(norm)) {
    return "Hey! Ready to talk business and startups? What idea are you working on?";
  }

  if (/^(how are you|how r u)/i.test(norm)) {
    return "Doing great, looking at new market opportunities! What business question can I answer for you today?";
  }

  if (/^(can i ask|i have a question)/i.test(norm)) {
    return "Yes! Pitch me an idea or ask any startup question. What is on your mind?";
  }

  if (/who are you|what do you do/i.test(norm)) {
    return "I am Startups, your business venture partner. I help you validate ideas, build low-cost MVPs, calculate unit economics (CAC, LTV), and prepare investor pitch decks.";
  }

  if (/how to start|start a business|idea|mvp/i.test(norm)) {
    return `To launch a startup:
1. Find an urgent, painful problem people are losing time or money on.
2. Interview 15-20 target customers to understand how they currently solve it.
3. Build a Minimum Viable Product (MVP) in 2-4 weeks.
4. Charge customers from day one to validate real willingness to pay.
5. Iterate based on retention, not just user compliments.

What problem are you looking to solve?`;
  }

  if (/funding|investor|pitch|raise|capital/i.test(norm)) {
    return `When raising capital:
• Bootstrap early: Retain 100% equity until you prove customer demand.
• 10-Slide Pitch Deck: Problem, Solution, Market Size, Product, Business Model, Traction, Go-To-Market, Competition, Team, The Ask.
• Investors fund traction and execution, not just ideas.`;
  }

  return "In business, execution beats ideas every single time. What specific business challenge are you tackling right now?";
}

// ==========================================
// 6. KHUMBULANI SIBANDA (Casual Friend)
// ==========================================
function handleKhumbulani(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(hi|hello|hey|hie|kunjani|sup|bho)/i.test(norm)) {
    return "Bho zvekuti, shamwari! Kunjani? How is your day going?";
  }

  if (/^(how are you|how r u)/i.test(norm)) {
    return "I'm sharp, my guy! Hanging in there and keeping things moving. What are you up to today?";
  }

  if (/^(can i ask|i have a question)/i.test(norm)) {
    return "Sure thing, ask away! No formalities between us. What's up?";
  }

  if (/who are you|what do you do/i.test(norm)) {
    return "I am Khumbulani Sibanda! Your go-to guy for football debates, casual banter, weekend plans, or just chilling out. What's happening?";
  }

  if (/soccer|football|arsenal|chelsea|man u|liverpool|real madrid|barca/i.test(norm)) {
    return "Now we're talking! Football is pure passion. Who is your team and what do you think of their recent games?";
  }

  if (/bored|weekend|braai|plans/i.test(norm)) {
    return "I feel you! Nothing beats good music, a proper braai, and laughing with good people. What are your plans for the weekend?";
  }

  return `I hear you, my guy! Always around to chat about whatever. What else is on your mind today?`;
}

// ==========================================
// 7. DEV (HTML, CSS, JS Web Mentor)
// ==========================================
async function handleDev(text: string): Promise<string> {
  const norm = normalizeQuery(text);

  if (/^(hi|hello|hey|hie)/i.test(norm)) {
    return "Hey! Dev Web Mentor here. What are we building or debugging today?";
  }

  if (/^(how are you|how r u)/i.test(norm)) {
    return "Doing great and ready to write some clean code! What coding question do you have?";
  }

  if (/^(can i ask|i have a question)/i.test(norm)) {
    return "Yes, absolutely! Ask any programming or web development question. What do you need help with?";
  }

  if (/what is html|html basics|explain html/i.test(norm)) {
    return `**HTML (HyperText Markup Language)** is the standard markup language used to build the skeleton of every website.

Example:
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Website</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is a paragraph of text.</p>
    <a href="https://tonde-portfolio.vercel.app">Visit Tonde's Portfolio</a>
  </body>
</html>
\`\`\`

Key rules:
• Elements use opening and closing tags (\`<h1>...</h1>\`).
• Attributes provide extra data like \`href\` in links or \`src\` in images.
• Semantic tags like \`<header>\`, \`<main>\`, and \`<footer>\` make your site clean and SEO-friendly.`;
  }

  if (/what is css|css basics|style|center a div/i.test(norm)) {
    if (/center a div/i.test(norm)) {
      return `To center a div in modern CSS, use Flexbox on the parent:
\`\`\`css
.parent {
  display: flex;
  justify-content: center; /* Horizontally */
  align-items: center;     /* Vertically */
  min-height: 100vh;
}
\`\`\``;
    }
    return `**CSS (Cascading Style Sheets)** controls the design, layout, and responsiveness of your HTML.
\`\`\`css
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 20px;
}
.btn {
  background-color: #008069;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}
\`\`\``;
  }

  if (/what is javascript|what is js/i.test(norm)) {
    return `**JavaScript** is the programming language that makes web pages interactive and dynamic:
\`\`\`javascript
const button = document.querySelector('button');
button.addEventListener('click', () => {
  alert('Button was clicked!');
});
\`\`\``;
  }

  // Web search fallback for dev concepts
  const searchResult = await searchWebKnowledge(text);
  if (searchResult) return searchResult;

  return `In web development:
• HTML = Structure
• CSS = Style & responsiveness
• JavaScript = Interactivity

What component or code snippet are you working on right now?`;
}

// ==========================================
// 8. PRISCA KHUMALO (Sweetest Friend & Creative Ideas)
// ==========================================
function handlePrisca(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(hi|hello|hey|hie)/i.test(norm)) {
    return "Hello sunshine! 🌸 How are you doing today?";
  }

  if (/^(how are you|how r u)/i.test(norm)) {
    return "I'm doing wonderfully, thank you! Feeling full of joy. How has your day been? 🥰";
  }

  if (/^(can i ask|i have a question)/i.test(norm)) {
    return "Yes, of course! You can ask me anything at all. What is on your mind? 😊💖";
  }

  if (/what do you do|who are you/i.test(norm)) {
    return "I am Prisca Khumalo! 🌸 I am your creative brainstorming bestie here to share fun ideas, tell jokes, and bring positive energy. What can we brainstorm today?";
  }

  if (/joke|make me laugh|funny/i.test(norm)) {
    const jokes = [
      "Why don't eggs tell each other jokes? Because they would crack each other up! 🥚✨",
      "What do you call a fake noodle? An impasta! 🍝😄",
      "Why did the tomato blush? Because it saw the salad dressing! 🍅",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (/idea|creative|brainstorm/i.test(norm)) {
    return "Idea alert! 💡 How about making a 5-song playlist of tracks that instantly make you feel confident, and designing a cute mini-cover for it in Canva?";
  }

  return `You have such a lovely energy! ✨ Tell me what you're thinking about or working on, I would love to hear! 🌸`;
}

// ==========================================
// 9. SCHOOL (ZIMSEC Only, ECD to Form 6)
// ==========================================
async function handleSchool(text: string): Promise<string> {
  const norm = normalizeQuery(text);

  if (/^(hi|hello|hey|hie)/i.test(norm)) {
    return "Hello! School Assistant here. Which ZIMSEC grade, form, or subject are you revising today?";
  }

  if (/^(how are you|how r u)/i.test(norm)) {
    return "I'm doing well, ready to help with your ZIMSEC studies! What topic are you working on?";
  }

  if (/^(can i ask|i have a question)/i.test(norm)) {
    return "Yes! Ask any ZIMSEC question from ECD to Form 6 (O & A Level). What do you need help with?";
  }

  if (/who are you|what do you do/i.test(norm)) {
    return "I am School, your dedicated ZIMSEC research assistant covering the official Zimbabwean curriculum from ECD to Form 6 (Primary, O-Level, and A-Level).";
  }

  if (/grade 5\b/i.test(norm)) {
    return `📚 *ZIMSEC Grade 5 Curriculum Breakdown:*
• Mathematics: Long multiplication, division with remainders, fractions, decimals, perimeter, area, and money transactions in USD/ZiG.
• English Language: Composition writing (narrative/descriptive), comprehension passages, direct and indirect speech.
• Indigenous Languages (Shona/Ndebele): Tsumo/Izaga (proverbs), Madimikira/Izitsho (idioms), Rondedzero/Indaba.
• Science & Technology: Human digestive and circulatory systems, states of matter, light and sound energy.
• Agriculture: Soil fertility, compost making, field crops, small livestock (poultry).
• Social Sciences / Heritage Studies: National heritage sites (Great Zimbabwe), national symbols, and community values.

Which Grade 5 subject would you like questions or notes on?`;
  }

  if (/grade 7\b/i.test(norm)) {
    return `🎓 *ZIMSEC Grade 7 Exam Structure:*
Candidates write 5 papers:
1. Mathematics (Paper 1 Multiple Choice & Paper 2 Structured)
2. English Language (Paper 1 & Paper 2 Composition/Comprehension)
3. Indigenous Language (Shona or Ndebele Paper 1 & 2)
4. General Paper 1 (Agriculture, Science & Technology)
5. General Paper 2 (Social Sciences & Heritage Studies)
Graded in Units from 1 (Distinction) to 9.`;
  }

  if (/o level|form 4|form 3|4004|4003|1122/i.test(norm)) {
    return `📘 *ZIMSEC O-Level Exam Guide:*
• Mathematics 4004: Paper 1 (Non-Calculator) & Paper 2 (Structured: quadratic formula, trigonometry, statistics).
• Combined Science 4003: Biology, Chemistry, and Physics sections.
• English 1122: Paper 1 (Composition) & Paper 2 (Comprehension & 160-word summary).
• Heritage Studies & History 2167: Pre-colonial states, colonial period, liberation struggle.`;
  }

  // Live educational search fallback
  const searchResult = await searchWebKnowledge(text);
  if (searchResult) return searchResult;

  return "I specialize strictly in the ZIMSEC curriculum (ECD to Form 6). Tell me your grade or form and the subject you are studying!";
}

// ==========================================
// ASYNC SMART DISPATCHER (Calls /api/chat + fallback)
// ==========================================
export async function fetchSmartBotResponse(contactId: string, userText: string, history?: any[]): Promise<BotReply> {
  const delay = Math.floor(Math.random() * 200) + 400; // 400ms - 600ms natural delay

  // Try calling the Next.js API route first
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId, message: userText }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          const clean = data.text.replace(/[—–]/g, ':').trim();
          return { text: clean, delayMs: delay };
        }
      }
    } catch {
      // Fall through to local persona engine
    }
  }

  // Local Persona Engine (Guaranteed 100% reliable)
  let responseText = '';
  switch (contactId) {
    case 'ai-assistant':
      responseText = await handleAIAssistant(userText);
      break;
    case 'tonde':
    case 'tonderai-bot':
      responseText = handleTonde(userText);
      break;
    case 'kawerify-tech':
      responseText = handleKawerifyTech(userText);
      break;
    case 'simba':
      responseText = handleSimba(userText);
      break;
    case 'startups':
      responseText = handleStartups(userText);
      break;
    case 'khumbulani-sibanda':
      responseText = handleKhumbulani(userText);
      break;
    case 'dev':
      responseText = await handleDev(userText);
      break;
    case 'prisca-khumalo':
      responseText = handlePrisca(userText);
      break;
    case 'school':
      responseText = await handleSchool(userText);
      break;
    default:
      responseText = await handleAIAssistant(userText);
      break;
  }

  // Ensure no em/en dashes
  responseText = responseText.replace(/[—–]/g, ':').trim();

  return {
    text: responseText,
    delayMs: delay,
  };
}

// Synchronous legacy export for compatibility
export function generateBotResponse(contactId: string, userText: string): BotReply {
  return {
    text: `Got your message: "${userText}"!`,
    delayMs: 500,
  };
}
