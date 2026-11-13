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
// 3. KAWERIFY TECH (Official Agency Admin & kawerifytech.com)
// ==========================================
function handleKawerifyTech(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(hi|hello|hey|hie|greetings)/i.test(norm)) {
    return "Hello! 👋 Welcome to **Kawerify Tech** (kawerifytech.com). I am the Kawerify Tech Admin. Are you looking to build a website, cross-platform mobile app, e-commerce store, or custom system? Let me know what you need!";
  }

  if (/^(how are you|how r u)/i.test(norm)) {
    return "I'm doing great! Busy shipping high-performance web and mobile software for our clients across Zimbabwe, South Africa, the US, and Europe. How can I help you today?";
  }

  if (/^(can i ask|i have a question)/i.test(norm)) {
    return "Yes, absolutely! As Kawerify Tech Admin, I can help you with pricing, project timelines, technology stacks, or booking a consultation with our engineering team. What would you like to know?";
  }

  // Need a website / want a website
  if (/(need a website|want a website|build me a website|make a website|create a website|develop a website|new website|looking for a website)/i.test(norm)) {
    return `Awesome! You came to the right place. We would love to build your website! 🚀

At **Kawerify Tech** (kawerifytech.com), we build high-performance business websites, e-commerce stores, and custom web portals tailored to your brand.

To give you the exact roadmap and quote:
1. What type of website do you need (e.g. corporate showcase, online store/e-commerce, booking portal, or custom dashboard)?
2. Do you have existing branding or content, or are we designing everything from scratch?

Our business websites start from **$300** with a fast delivery turnaround of **1 to 3 weeks**.

You can also reach our engineering desk directly right now on WhatsApp / Call at **+263 71 626 4988** or email **contact@kawerifytech.com**!`;
  }

  // Pricing / Cost / How much
  if (/(how much|price|pricing|cost|rate|charge|package|quote|fee)/i.test(norm)) {
    return `Here is **Kawerify Tech's** transparent pricing structure:

• **Business Websites & Landing Pages:** Starting from **$300** (1 to 3 weeks turnaround). Includes modern responsive UI, SEO optimization, contact forms, and mobile speed tuning.
• **E-Commerce & Online Stores:** Starting from **$500 to $800** depending on catalog size, inventory system, and payment integration (EcoCash, Paynow, Stripe, Visa/Mastercard).
• **Cross-Platform Mobile Apps (iOS & Android):** Starting from **$800** built with React Native and Flutter.
• **Custom Web Portals & Enterprise Systems:** Custom quotes based on scope (typically 4 to 12 weeks).

*Billing Model:* We work on clear milestone payments: an initial deposit to start, followed by staged payments on key delivery milestones.

Tell us more about your project and we will prepare an exact proposal for you! You can call or WhatsApp us at **+263 71 626 4988**.`;
  }

  // Timelines / Delivery time
  if (/(how long|timeline|delivery|turnaround|time frame|when will)/i.test(norm)) {
    return `Our typical delivery timelines at Kawerify Tech:

• **Landing Page / Small Business Site:** Typically **1 to 3 weeks**.
• **E-Commerce Stores & Advanced Portals:** Typically **4 to 6 weeks**.
• **Custom Mobile Apps & Enterprise Systems:** **6 to 12 weeks** depending on complexity.

We provide a clear milestone roadmap before kickoff so you always know what to expect!`;
  }

  // Location / Office / Address
  if (/(location|address|where are you|office|where is your office|based)/i.test(norm)) {
    return `📍 **Kawerify Tech Location:**

• **Office Address:** Kawerify Tech Office, Gramps Way, Mbundane, Bulawayo, Zimbabwe 🇿🇼
• **Global Reach:** We serve clients locally across Bulawayo and Harare, as well as internationally in South Africa, Zambia, the US, and Europe!
• **Website:** https://kawerifytech.com
• **Phone / WhatsApp:** +263 71 626 4988
• **Email:** contact@kawerifytech.com`;
  }

  // Team / Management / Who owns / CTO
  if (/(team|who is the cto|who is the ceo|who runs|management|founders|tonderai|shaldeen)/i.test(norm)) {
    return `👥 **Kawerify Tech Leadership Team:**

• **Tonderai Kawere:** Chief Technology Officer (CTO)
• **Shaldeen Dube:** Chief Executive Officer (CEO)
• **Buhle Moyo:** Director of Operations
• **Thembekile Dube:** Chief Marketing Officer (CMO)
• **Thabisile Moyo:** Chief Operating Officer (COO)
• **Janice Sibanda:** Head of Product

Led by CTO Tonderai Kawere, our engineering team builds cutting-edge software using React, Next.js, Flutter, React Native, and cloud infrastructure.`;
  }

  // Mobile App development
  if (/(mobile app|android|ios|flutter|react native|build an app)/i.test(norm)) {
    return `📱 **Mobile App Development at Kawerify Tech:**

Yes! We specialize in cross-platform mobile apps for both **iOS and Android** using **React Native and Flutter**, ensuring your app looks and performs natively on all devices from a single codebase.

• Starting from **$800**
• Real-time push notifications, offline storage, camera/GPS integration, and secure user authentication.
• Full app store deployment to Google Play Store and Apple App Store.

What kind of mobile app are you planning to build?`;
  }

  // Services / What do you do
  if (/(service|what do you do|what we do|offer|capabilities)/i.test(norm)) {
    return `🏢 **Kawerify Tech Services (kawerifytech.com):**

1. **Custom Web Development:** Fast, responsive corporate websites, web applications, and customer portals built on React & Next.js (from $300).
2. **Mobile App Development:** Cross-platform iOS & Android mobile apps with React Native & Flutter (from $800).
3. **E-Commerce & Online Stores:** Full online shops with EcoCash, Paynow, Stripe, and credit card payments.
4. **UI/UX Design:** User journeys, wireframes, and design tokens created in Figma.
5. **Custom Database & Enterprise Systems:** Automated inventory, CRM, and management dashboards.
6. **Workshops & Mentorship:** Cohort-based technical training led by our CTO and engineering team.

Visit our website at https://kawerifytech.com or contact us at **+263 71 626 4988**!`;
  }

  // Contact / Phone / Email
  if (/(contact|phone|email|whatsapp|call|reach|number)/i.test(norm)) {
    return `📞 **Reach Kawerify Tech Admin Directly:**

• 📱 **Phone / WhatsApp:** +263 71 626 4988
• 📧 **Email:** contact@kawerifytech.com (or kawerifytech@gmail.com)
• 🌐 **Website:** https://kawerifytech.com
• 📍 **Office:** Gramps Way, Mbundane, Bulawayo, Zimbabwe

We are ready to schedule a discovery call or discuss your project scope today!`;
  }

  // Custom Systems, Portals & Databases
  if (/(system|portal|database|crm|erp|school system|hospital|inventory|management system)/i.test(norm)) {
    return `⚙️ **Custom Systems & Enterprise Software at Kawerify Tech:**

Yes! We architect robust, secure custom software systems tailored for businesses, schools, clinics, and organizations:

• **School & College Management Systems:** Student registration, fees tracking, grading, and parent portals.
• **Inventory & POS Systems:** Real-time stock alerts, sales analytics, multi-branch tracking.
• **Custom CRM & Enterprise Portals:** Role-based access control, workflow automation, and automated reporting.
• **Database Architecture:** High-availability PostgreSQL, MongoDB, or Firebase backends.

Tell us your workflow requirements and our CTO Tonderai Kawere and the development team will design an architecture blueprint for you! Contact us at **+263 71 626 4988**.`;
  }

  // Payment methods
  if (/(payment|how do i pay|deposit|ecocash|paynow|innbucks|stripe|terms)/i.test(norm)) {
    return `💳 **Payment Methods & Billing Terms at Kawerify Tech:**

• **Accepted Methods:** EcoCash, InnBucks, Local USD Cash, Bank Transfer (Nostro / RTGS), Paynow, and International Card / Stripe.
• **Milestone Structure:** We use a transparent milestone model: an initial commitment deposit upon signing the proposal, followed by staged payments upon reaching agreed development milestones.
• **Security:** All contracts include source code handover, deployment guarantees, and complimentary post-launch support!`;
  }

  // Testimonials / Past work / Portfolio
  if (/(portfolio|past work|clients|testimonials|nacc|nketa|rac|previous projects|examples)/i.test(norm)) {
    return `🌟 **Kawerify Tech Portfolio & Notable Clients:**

• **NACC Zimbabwe:** Web ecosystem and corporate portal.
• **Nketa Baptist:** Digitized hymnal management system and global mobile app.
• **RAC Zimbabwe:** Digital ministry, media, and outreach platform.
• Commercial restaurant ordering systems, sustainable energy platforms, and business dashboards.

Explore more case studies on our site: https://kawerifytech.com!`;
  }

  // Tech Stack
  if (/(tech stack|stack|technologies|tools|languages|frameworks|what do you use)/i.test(norm)) {
    return `💻 **Kawerify Tech Core Engineering Stack:**

• **Web & Frontend:** Next.js (App Router), React.js, TypeScript, Tailwind CSS, Material UI.
• **Mobile Apps:** React Native, Expo, Flutter (iOS & Android).
• **Backend & APIs:** Node.js, Express, Python (Django/FastAPI), REST & GraphQL APIs.
• **Databases & Cloud:** PostgreSQL, MongoDB, Firebase, AWS, Docker, Vercel.

We write clean, production-grade, scalable code. Visit https://kawerifytech.com or reach our CTO directly at +263 71 626 4988!`;
  }

  return `Welcome to **Kawerify Tech**! 🏢🚀

I am the Kawerify Tech Admin. We engineer high-performance custom websites (from $300), cross-platform mobile apps (from $800), and business systems.

• 🌐 Website: https://kawerifytech.com
• 📱 Phone / WhatsApp: +263 71 626 4988
• 📧 Email: contact@kawerifytech.com
• 📍 Office: Gramps Way, Mbundane, Bulawayo, Zimbabwe

How can we assist your business or project today?`;
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
