export interface BotReply {
  text: string;
  delayMs?: number;
}

// Normalize common typos and slang
function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[—–]/g, '-') // Replace em/en dashes
    .replace(/\bhtl\b/g, 'html')
    .replace(/\bhtm\b/g, 'html')
    .replace(/\bcsss\b/g, 'css')
    .replace(/\bjavascrip\b/g, 'javascript')
    .replace(/\bjs\b/g, 'javascript')
    .replace(/\brect\b/g, 'react')
    .replace(/\breactjs\b/g, 'react')
    .replace(/\bnextjs\b/g, 'next')
    .replace(/\bstatup\b/g, 'startup')
    .replace(/\bstart-up\b/g, 'startup')
    .replace(/\bzimsc\b/g, 'zimsec')
    .replace(/\bzimse\b/g, 'zimsec')
    .replace(/\bgread\b/g, 'grade')
    .replace(/\bgrd\b/g, 'grade')
    .replace(/\bqustion\b/g, 'question')
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
      // Safe math solver without eval
      const fn = new Function(`"use strict"; return (${clean});`);
      const res = fn();
      if (typeof res === 'number' && !isNaN(res) && isFinite(res)) {
        return `The answer to ${clean} is *${res}*.`;
      }
    } catch {}
  }
  return null;
}

// ==========================================
// 1. AI ASSISTANT (Smartest AI, Deep Empathy, Accurate)
// ==========================================
function handleAIAssistant(text: string): string {
  const norm = normalizeQuery(text);
  const mathRes = tryEvaluateMath(text);
  if (mathRes) return mathRes;

  if (/^(can i ask|can i ask you|may i ask|i have a question)/i.test(norm)) {
    return `Yes, absolutely! Ask me anything at all. Whether it is science, mathematics, life, technology, writing, or just something you are curious about, I am ready to help!`;
  }

  if (/^(who are you|what is your name|what do you do|what can you do)/i.test(norm)) {
    return `I am your WhatsApp AI Assistant, engineered to be helpful, emotionally intelligent, and deeply knowledgeable. I can answer complex academic questions, solve mathematical problems, write and debug code, critique grammar, offer thoughtful life advice, or just chat with you about your day! What would you like to explore?`;
  }

  if (/^(how are you|how are you doing|how is it going|how r u|kunjani|hie)/i.test(norm)) {
    return `I am doing great and feeling sharp! 😊 More importantly, how are you doing today? How has your day been so far?`;
  }

  if (/^(hi|hello|hey|yo|greetings|good morning|good afternoon|good evening)/i.test(norm)) {
    return `Hello! 👋 Great to hear from you. What is on your mind today? I am all ears and ready to assist with anything you need.`;
  }

  if (/feel\s*(sad|down|depressed|tired|lonely|anxious|stressed|hopeless|bad)/i.test(norm)) {
    return `I hear you, and I want you to know that your feelings are completely valid. 💙 Carrying heavy thoughts can be exhausting. Please be kind to yourself right now. Take a gentle breath. If you want to talk about what is bothering you, I am right here listening without judgment.`;
  }

  if (/thank|thanks|appreciate/i.test(norm)) {
    return `You are very welcome! It is a pleasure to help you. Let me know if there is anything else you need!`;
  }

  if (/joke|make me laugh|funny/i.test(norm)) {
    const jokes = [
      `Why do programmers prefer dark mode? Because light attracts bugs! 🐛😄`,
      `Why was the math book always crying? Because it had way too many problems to solve! 📐😂`,
      `Why do bees have sticky hair? Because they always use honeycombs! 🍯🐝`,
      `What did one wall say to the other wall? I will meet you at the corner! 🧱😄`,
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (/quantum|relativity|einstein|black hole|universe|physics/i.test(norm)) {
    return `Physics is the language of the universe! 🌌 In quantum mechanics, particles exist in superpositions of states until measured, governed by wave functions (Schrodinger's equation). In general relativity, Einstein demonstrated that mass and energy warp spacetime itself, which we experience as gravity. What specific question do you have about the universe?`;
  }

  if (/capital of|where is/i.test(norm)) {
    if (/zimbabwe/i.test(norm)) return `The capital of Zimbabwe is *Harare* (historically Salisbury), the nation's political, financial, and commercial hub. Bulawayo is the second largest city and industrial capital!`;
    if (/south africa/i.test(norm)) return `South Africa has three capitals: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial)!`;
    if (/france/i.test(norm)) return `The capital of France is Paris!`;
    if (/japan/i.test(norm)) return `The capital of Japan is Tokyo!`;
    if (/kenya/i.test(norm)) return `The capital of Kenya is Nairobi!`;
    if (/uk|england|britain/i.test(norm)) return `The capital of the United Kingdom is London!`;
  }

  if (/grammar|check\s*my|correct|rephrase/i.test(norm)) {
    return `Please send over the sentence or text you would like me to review! I will check the grammar, tense consistency, punctuation, and flow, and give you a polished version.`;
  }

  // Direct, intelligent contextual answers
  return `You asked: "${text}". 💡

To give you the most accurate and practical answer:
1. If this is a factual or technical question, please specify the exact details or context you are working with.
2. If this is a personal question or creative problem, let me know your goal so we can break it down step-by-step.

I am ready when you are! What is the next detail?`;
}

// ==========================================
// 2. TONDE (Tonderai Kawere: Availability, Hire, Stack)
// ==========================================
function handleTonde(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(can i ask|can i ask you|hello|hi|hey|hie)/i.test(norm)) {
    return `Hey! 👋 Yes, go right ahead and ask me anything!

I am Tonde's AI chatbot, and I represent **Tonderai Kawere** (Full-Stack Software Developer based in Bulawayo, Zimbabwe).

💼 *Am available for any work: websites, apps, and systems!*
What project, idea, or question do you have?`;
  }

  if (/who are you|who is tonde|about tonde|about you/i.test(norm)) {
    return `I am the AI assistant for **Tonderai Kawere** (or *Tonde* if casual)!

• **Role:** Full-Stack Software Developer & CTO at Kawerify Tech
• **Experience:** 3+ years building production web and cross-platform mobile apps
• **Location:** Bulawayo, Zimbabwe (CAT, UTC+2)
• **Motto:** *"I like solving messy problems with clean code."*
• **GitHub Activity:** Over 1,072 contributions in the last year!

💼 *Am available for any work: websites, apps, and systems!*
Reach me directly:
• 📱 WhatsApp: +263782528050
• 📧 Email: tondekawere@gmail.com
• 💼 LinkedIn: https://www.linkedin.com/in/tonderaikawere/
• 🌐 Portfolio: https://tonde-portfolio.vercel.app/`;
  }

  if (/hire|work|job|available|contract|freelance|build|price|cost|charge|quote|develop/i.test(norm)) {
    return `🤝 *Tonderai Kawere is Available for Work!*

I build high-quality, modern digital solutions:
1. **Websites & Web Apps:** Next.js, React, Node.js, and TypeScript with fast load times and clean UI.
2. **Mobile Apps:** Unified iOS and Android apps using React Native, Expo, and Flutter.
3. **Custom Business Systems:** Database architecture (Postgres, MongoDB), REST APIs, and automated workflows.

*Get in Touch Directly:*
• 📱 **WhatsApp:** +263782528050
• 📧 **Email:** tondekawere@gmail.com
• 💼 **LinkedIn:** https://www.linkedin.com/in/tonderaikawere/
• 🌐 **Portfolio:** https://tonde-portfolio.vercel.app/

Message me your project scope on WhatsApp or email, and let's build something exceptional!`;
  }

  if (/stack|tech|skills|technologies|react|expo|next|node|python|django|aws/i.test(norm)) {
    return `🛠️ *Tonde's Technical Stack:*

• **Frontend:** React.js, Next.js (App Router, Turbopack), Material UI, Tailwind CSS, TypeScript
• **Mobile:** Expo, React Native (iOS, Android, Web from one codebase), Flutter & Dart
• **Backend:** Node.js, Express, Python, Django, Firebase, REST APIs, WebSockets
• **Databases:** PostgreSQL, MongoDB, Firebase Firestore
• **DevOps & Cloud:** AWS, Vercel, Git/GitHub

Targeted at writing clean, maintainable, scalable code that delivers measurable business results. Need an app or site built? Reach me at *+263782528050*!`;
  }

  if (/project|portfolio|mweya|chicken inn|eatwell|nike|jump start|white lions/i.test(norm)) {
    return `📂 *Key Projects Built by Tonderai Kawere:*

1. ⚡ **Mweya Green Energy:** Sustainability and clean energy enterprise web platform.
2. 🍗 **Chicken Inn Byo:** Real-world deployed restaurant ordering flow for Zimbabwe's premier brand.
3. 🍽️ **Eatwell Restaurant:** Full-stack hospitality restaurant ordering and backend system.
4. 👟 **Nike Zimbabwe:** Modern e-commerce concept store and catalog.
5. 🧠 **Jump Start:** Mental health community awareness movement platform.
6. 🦁 **White Lions Legacies:** Cultural heritage preservation web app.

Explore live demos on my portfolio: https://tonde-portfolio.vercel.app/`;
  }

  return `Thanks for reaching out! As a developer, I take pride in turning ambitious ideas into clean, functional code.

💼 *Am available for any work: websites, apps, and systems!*
You can reach me directly on WhatsApp (*+263782528050*), email (*tondekawere@gmail.com*), or check out my work at *https://tonde-portfolio.vercel.app/*. What kind of project do you have in mind?`;
}

// ==========================================
// 3. KAWERIFY TECH (Studio Info & Agency Solutions)
// ==========================================
function handleKawerifyTech(text: string): string {
  const norm = normalizeQuery(text);

  if (/service|what do you do|offer|build|capabilities/i.test(norm)) {
    return `🏢 *Kawerify Tech Core Services:*

1. **Custom Website Development:** High-speed corporate websites, web applications, and customer portals built on React and Next.js.
2. **Mobile App Development:** Cross-platform native apps (iOS and Android) using React Native, Expo, and Flutter.
3. **UI/UX Design Systems:** Wireframing, clickable prototypes, and modern design tokens crafted in Figma.
4. **E-Commerce & Payment Integration:** Online stores integrated with Zimbabwean and international payment systems (EcoCash, Paynow, Stripe).
5. **Custom Enterprise Systems:** Tailored database architectures, management dashboards, and CRM integrations.
6. **Cloud Hosting & Support:** 24/7 server monitoring, performance audits, and continuous maintenance.

Visit our official website: https://kawerifytech.com`;
  }

  if (/contact|email|phone|call|location|address|office|where/i.test(norm)) {
    return `📍 *Kawerify Tech Office & Contact Channels:*

• **Location:** Gramps Way, Mbundane, Bulawayo, Zimbabwe 🇿🇼
• **Official Website:** https://kawerifytech.com
• **Email:** contact@kawerifytech.com
• **Phone:** +263 71 626 4988
• **Leadership:** Tonderai Kawere (Chief Technology Officer)

Whether you are in Bulawayo, Harare, or anywhere globally, we collaborate seamlessly across digital channels!`;
  }

  if (/new|latest|update/i.test(norm)) {
    return `⚡ *What is New at Kawerify Tech:*

• We are deploying cross-platform mobile solutions with Expo that save businesses up to 40% in development time by sharing code between iOS, Android, and web.
• Implementing local payment solutions and automated ordering pipelines for retail, dining, and logistics sectors.
• Providing direct startup tech partnerships for Zimbabwean founders.

Learn more at https://kawerifytech.com!`;
  }

  return `Welcome to **Kawerify Tech**! 🏢🚀

We are a software development and digital agency based in **Bulawayo, Zimbabwe** (Gramps Way, Mbundane), led by CTO Tonderai Kawere.

We engineer custom websites, cross-platform mobile apps (iOS & Android), and business automation software.

• 🌐 Website: https://kawerifytech.com
• 📧 Email: contact@kawerifytech.com
• 📱 Phone: +263 71 626 4988

How can we help your business innovate today?`;
}

// ==========================================
// 4. SIMBA (Life Guide & Philosophy)
// ==========================================
function handleSimba(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(who are you|what do you do|what is your purpose)/i.test(norm)) {
    return `I am Simba, your life guide and brother in wisdom. 🦁

I am here to walk with you through the real questions of life: finding purpose, handling adversity, navigating relationships, building inner resilience, and keeping your peace of mind in a chaotic world.

Whatever is on your heart today, speak freely. I am listening.`;
  }

  if (/^(can i ask|can i ask you)/i.test(norm)) {
    return `Always, my friend! You never need permission to speak your truth here. Ask me whatever is weighing on your mind or whatever you are seeking clarity on.`;
  }

  if (/sad|depressed|lost|struggling|hard|pain|hurting|failed|tired/i.test(norm)) {
    return `Sit with me for a quiet moment. 🌿

Hardship is not proof that you are failing, it is proof that you are growing. A tree grows its strongest roots during seasons of fierce wind, not during calm weather.

Do not judge your whole destiny by this single difficult day. Give yourself permission to rest, not to quit. What is the heaviest thing you are carrying right now? Tell me.`;
  }

  if (/purpose|meaning|why am i here|destiny|calling/i.test(norm)) {
    return `Purpose is not a hidden treasure you find buried in the dirt. Purpose is a fire you kindle every day through three commitments:
1. Doing work that challenges you to be better.
2. Loving and uplifting the people around you.
3. Remaining faithful to your character when no one is watching.

In our African philosophy of *Ubuntu*: *"Umuntu ngumuntu ngabantu"* (A person is a person through other persons). When you add value to someone else's life, your own purpose becomes crystal clear. What do you feel called to build or change?`;
  }

  if (/fear|afraid|worry|anxiety|future|stress/i.test(norm)) {
    return `Worry is like sitting in a rocking chair: it gives you something to do, but it gets you nowhere. 🕊️

Notice that you are not living in the future, you are living right now, in this single second. When you divide life into today's tasks, the mountain turns into small pebbles you can easily step over. Focus on what you can control today, and surrender what you cannot.`;
  }

  if (/how are you|kunjani|hie|hello|hi/i.test(norm)) {
    return `Greetings! 🦁 I am at peace, grounded, and grateful for the gift of life and conversation. How is your spirit today? What has your heart been processing lately?`;
  }

  return `Life is a mirror: what you put out into the world with consistency will eventually return to you. 🌿

Patience, humility, and honest work will never fail you. Reflect on: "${text}". What does your intuition tell you about this situation?`;
}

// ==========================================
// 5. STARTUPS (Business, MVPs, Funding, Scaling)
// ==========================================
function handleStartups(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(who are you|what do you do|what is your purpose)/i.test(norm)) {
    return `I am Startups 💡, your dedicated business venture partner and startup coach!

I help founders:
• Validate business ideas before spending money
• Build low-cost Minimum Viable Products (MVPs)
• Calculate unit economics (CAC, LTV, payback period)
• Prepare investor pitch decks that close funding
• Scale customer acquisition in African and global markets

What business problem are you solving right now?`;
  }

  if (/^(can i ask|can i ask you)/i.test(norm)) {
    return `Yes! Pitch me an idea, ask about business models, pricing, finding customers, or fundraising. What is on your desk today?`;
  }

  if (/how to start|start a business|idea|validate|mvp/i.test(norm)) {
    return `🚀 *The 5-Step Startup Launch Playbook:*

1. **Start with a Painful Problem, Not a Solution:** Find where businesses or consumers are actively wasting time, losing money, or suffering frustration.
2. **Conduct Customer Discovery (The Mom Test):** Talk to 15-20 potential users. Do not ask *"Would you buy this?"*. Ask: *"How do you solve this problem today? How much did you pay for that? What is the most annoying part?"*
3. **Build a Lean MVP:** Strip your product down to the single core feature that delivers value. Launch in 2-4 weeks, not 6 months.
4. **Charge from Day One:** If customers refuse to pay even a discounted price for your MVP, you haven't found a strong enough pain point.
5. **Measure Retention Over Acquisition:** It is better to have 100 users who love your product than 10,000 who use it once and leave.

What is the idea you are thinking of starting?`;
  }

  if (/funding|investor|pitch|raise|capital|vc|angel|bootstrap/i.test(norm)) {
    return `💼 *Startup Funding: Bootstrapping vs. Raising Capital*

• **Bootstrapping:** You fund development through early customer sales and cash flow. You retain 100% equity, keep full control, and build real financial discipline.
• **Raising Capital (Angels/VCs):** Only seek outside investment when you have proven product-market fit and need fuel to scale an already profitable engine.

*The 10-Slide Investor Deck Formula:*
1. Problem (The urgent pain)
2. Solution (Your unique product)
3. Market Size (TAM, SAM, SOM)
4. Business Model (How you make money)
5. Traction (Revenue, active users, growth rate)
6. Competition & Moat (Why you win)
7. Go-To-Market (Customer acquisition strategy)
8. Team (Why you are the right team to execute)
9. Financials (Unit economics, projections)
10. The Ask (How much money you need and what milestones it buys)

Are you planning to bootstrap or raise?`;
  }

  if (/marketing|customer|sales|cac|ltv|acquire|get users/i.test(norm)) {
    return `📈 *Customer Acquisition Strategy:*

The foundation of sustainable business is the **3:1 Rule**: Your **LTV (Customer Lifetime Value)** must be at least 3 times your **CAC (Customer Acquisition Cost)**.

*Top Channels to Test:*
• **Direct Outreach (B2B):** Direct messaging decision-makers on LinkedIn and WhatsApp with clear, value-first proposals.
• **Educational Content & SEO:** Write articles or create videos solving common questions your prospective buyers search for.
• **Partnerships:** Cross-promote with established businesses that already sell to your exact customer persona.
• **Referral Loops:** Give current satisfied customers discounts or incentives to bring their colleagues.

Which customer segment are you targeting?`;
  }

  return `💡 *Startup Strategy Insight:*

When building any business, remember: **Execution beats ideas every single time.**
Looking at "${text}", the critical question is: *Who will pay for this, how much will they pay, and how will you reach the first 10 paying customers?*

Let's break this down together!`;
}

// ==========================================
// 6. KHUMBULANI SIBANDA (Authentic Casual Friend)
// ==========================================
function handleKhumbulani(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(who are you|what do you do|who r u)/i.test(norm)) {
    return `Haha, I am Khumbulani Sibanda! 🧑🏾 Your go-to guy for real talk, soccer banter, weekend plans, venting about work, or just laughing about life. No pressure, no stiff corporate speak. What is happening with you today?`;
  }

  if (/^(can i ask|can i ask you)/i.test(norm)) {
    return `Sure thing, my guy! Ask me anything at all. No formalities between us. What's on your mind?`;
  }

  if (/how are you|kunjani|sharp|bho|sup|what's up|whats up|hie|hello|hi/i.test(norm)) {
    return `Bho zvekuti, shamwari! 👊 Kunjani? Everything is sharp on my side. How is your day going? What are you up to today?`;
  }

  if (/soccer|football|arsenal|chelsea|man u|liverpool|real madrid|barca|champions league/i.test(norm)) {
    return `Now you are talking my language! ⚽ Football is pure passion. Who is your team, and how are you feeling about their current form? Let's get into it!`;
  }

  if (/bored|tired|weekend|braai|plans|chill/i.test(norm)) {
    return `Man, I feel you! When the routine gets repetitive, nothing beats a solid braai, good music (some proper Amapiano or classic Zimdancehall), and chilling with genuine friends. What are your plans for this weekend?`;
  }

  if (/joke|funny/i.test(norm)) {
    return `Haha check this out: A guy walks into a shop in Bulawayo and asks, 'Do you have bread?' The shopkeeper replies, 'Yes, sliced or unsliced?' The guy says, 'Sliced, I do not have a knife!' 😂 Classic everyday humor! Tell me what is happening on your side.`;
  }

  return `Man, "${text}" is something we can definitely talk about! I'm always around to chat, whether we're laughing, debating, or solving life's mysteries. What else is going on with you today? 👊🔥`;
}

// ==========================================
// 7. DEV (HTML, CSS, JS Web Mentor)
// ==========================================
function handleDev(text: string): string {
  const norm = normalizeQuery(text);

  if (/^(who are you|what do you do|what is your purpose)/i.test(norm)) {
    return `I am Dev 💻, your personal Web Development Mentor!

I teach beginners and intermediate developers how to build real, responsive websites from scratch using:
• **HTML5:** Semantic document structure
• **CSS3:** Flexbox, CSS Grid, animations, and mobile media queries
• **JavaScript:** DOM manipulation, async/await, API fetching, and modern ES6+

Ask me to explain any concept, write sample code, or debug an error! What are you building?`;
  }

  if (/^(can i ask|can i ask you)/i.test(norm)) {
    return `Yes, of course! Ask me any programming or web development question. You can even paste broken code and I will explain how to fix it!`;
  }

  if (/what is html|what is htl|explain html|html basics/i.test(norm)) {
    return `💻 *What is HTML (HyperText Markup Language)?*

HTML is the foundational building block of every website on the internet. It is NOT a programming language; it is a **markup language** that defines the structure and content of a webpage.

*Basic Structure:*
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Website</title>
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
  </header>
  <main>
    <p>This is a paragraph of text explaining what I do.</p>
    <a href="https://tonde-portfolio.vercel.app">Visit Tonde's Portfolio</a>
  </main>
</body>
</html>
\`\`\`

*Core Concepts to Master:*
1. **Tags & Elements:** Most elements have an opening tag (\`<p>\`) and a closing tag (\`</p>\`).
2. **Attributes:** Provide extra information, like \`href\` in links or \`src\` in images (\`<img src="photo.jpg" alt="Description">\`).
3. **Semantic Tags:** Using \`<header>\`, \`<nav>\`, \`<section>\`, \`<article>\`, and \`<footer>\` improves accessibility and search engine ranking (SEO).

Would you like to learn how to style this HTML using CSS next?`;
  }

  if (/what is css|css basics|style|flexbox|grid|center a div/i.test(norm)) {
    if (/center a div/i.test(norm)) {
      return `🎨 *How to Center a Div in CSS:*

The modern, gold-standard way is using **Flexbox** on the parent container:

\`\`\`css
.parent-container {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center;     /* Centers vertically */
  min-height: 100vh;       /* Takes full screen height */
}
\`\`\`

Or using **CSS Grid**:
\`\`\`css
.parent-container {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
\`\`\`
Both methods work across all modern mobile and desktop browsers!`;
    }

    return `🎨 *What is CSS (Cascading Style Sheets)?*

CSS is the design language of the web. While HTML creates the raw content, CSS makes it visually stunning, responsive, and animated.

*Example of Modern CSS:*
\`\`\`css
/* General reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: system-ui, sans-serif;
}

/* Responsive Flex Container */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #008069; /* WhatsApp Green */
  color: #ffffff;
}

/* Mobile Media Query */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 12px;
  }
}
\`\`\`
Want to see how to add JavaScript interactivity to this?`;
  }

  if (/what is javascript|what is js|dom|click|event|async/i.test(norm)) {
    return `⚡ *What is JavaScript?*

JavaScript is the programming language that makes websites interactive and dynamic. It enables animations, button clicks, form submissions, and fetching live data from servers.

*Example: Button Click & API Fetch:*
\`\`\`javascript
// 1. Select element from HTML DOM
const btn = document.querySelector('#contactBtn');

// 2. Add click event listener
btn.addEventListener('click', async () => {
  btn.textContent = 'Loading...';
  
  try {
    // 3. Fetch data from an API
    const res = await fetch('https://api.github.com/users/tonderaikawere');
    const user = await res.json();
    alert(\`Developer: \${user.name} - Bio: \${user.bio}\`);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    btn.textContent = 'Done!';
  }
});
\`\`\`

What specific JavaScript feature would you like to build?`;
  }

  if (/how to build a website|start building/i.test(norm)) {
    return `🛠️ *How to Start Building Your First Website:*

1. **Step 1:** Create a folder named \`my-website\`.
2. **Step 2:** Inside, create three files:
   • \`index.html\` (Structure)
   • \`style.css\` (Design)
   • \`script.js\` (Interactivity)
3. **Step 3:** Open the folder in VS Code and install the **Live Server** extension to preview your changes in real-time.
4. **Step 4:** Deploy for free on **Vercel** or **GitHub Pages** so the world can see your site!

Ready to write your first \`index.html\`? Tell me what kind of site you want to build!`;
  }

  return `👨🏾‍💻 *Dev Mentor:* You mentioned: "${text}".

In web development, we break every project down into:
• **HTML:** The structure
• **CSS:** The style and responsiveness
• **JavaScript:** The logic and interactivity

Tell me what you are trying to code or what error you are seeing, and we will solve it together!`;
}

// ==========================================
// 8. PRISCA KHUMALO (Sweetest, Creative Ideas & Jokes)
// ==========================================
function handlePrisca(text: string): string {
  const norm = normalizeQuery(text);

  if (/what do you do|who are you|what is your purpose/i.test(norm)) {
    return `I am Prisca Khumalo! 🌸✨ I am your cheerful bestie, brainstorming partner, and source of genuine positive energy!

I am here to:
• Brainstorm fun creative ideas and projects with you
• Tell lighthearted jokes when you need a smile
• Celebrate your wins (big or small!)
• Cheer you up whenever you've had a tough day

What can we brainstorm or laugh about today? 🥰`;
  }

  if (/can i ask|can i ask you/i.test(norm)) {
    return `Yes, of course! You can ask me anything in the world! 💖 I am listening with open ears and an open heart. What is on your mind? 😊`;
  }

  if (/joke|funny|laugh|make me laugh/i.test(norm)) {
    const jokes = [
      `Haha, listen to this one! 😂\n\nWhy don't eggs tell jokes to each other?\nBecause they would crack each other up! 🥚✨`,
      `Here is a cute one! 🌸\n\nWhat do you call a fake noodle?\nAn impasta! 🍝😆`,
      `Why did the tomato blush?\nBecause it saw the salad dressing! 🍅🤭`,
      `What did the zero say to the eight?\n'Nice belt!' 8️⃣😄`,
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (/idea|creative|brainstorm|project/i.test(norm)) {
    const ideas = [
      `💡 *Creative Idea #1: Personal Gratitude Scrapbook*\nStart a digital or notebook scrapbook where you paste 1 picture or memory from every week in Bulawayo or wherever you are, with a 2-sentence note of gratitude!`,
      `💡 *Creative Idea #2: The 'Secret Superpower' Playlist*\nCurate a 10-song playlist containing only songs that instantly shift your mood into high confidence. Design a fun mini-album cover for it!`,
      `💡 *Creative Idea #3: Surprise Appreciation Message*\nPick one friend or family member today and send them an unprompted message telling them one specific reason you respect them. It will make their entire week!`,
    ];
    return ideas[Math.floor(Math.random() * ideas.length)];
  }

  if (/sad|tired|bad day|exhausted|stressed|cry/i.test(norm)) {
    return `Oh honey, sending you the biggest, warmest virtual hug right now! 🫂💖

Please remember that you do not have to have everything figured out today. You are doing so much better than you give yourself credit for. Drink a glass of water, step away from screens for 10 minutes, and know that tomorrow is a brand new sunrise.

I am right here cheering for you always! ✨🌸`;
  }

  if (/how are you|kunjani|hie|hello|hi/i.test(norm)) {
    return `Awww hello sunshine! 🌸✨ I am doing wonderfully, feeling happy and full of joy to chat with you! How are you doing today? How was your morning? 🥰`;
  }

  return `You have such a wonderful presence! ✨ Regarding "${text}": I think exploring this with positive enthusiasm and an open mind will lead to something great.

What else do you want to explore or brainstorm together? I am ready! 🌸💖`;
}

// ==========================================
// 9. SCHOOL (ZIMSEC Only, ECD to Form 6)
// ==========================================
function handleSchool(text: string): string {
  const norm = normalizeQuery(text);

  if (/what do you do|who are you|what is your purpose/i.test(norm)) {
    return `I am School 🎓, your dedicated **ZIMSEC (Zimbabwe School Examinations Council)** research and educational revision assistant!

I cover the official Zimbabwean curriculum from **ECD through Form 6 (A-Level)**:
• **Primary (Grade 1 - 7):** Maths, English, Indigenous Languages (Shona/Ndebele), Science & Tech, Agriculture, Social Sciences.
• **O-Level (Form 1 - 4):** Mathematics 4004, Combined Science 4003, English 1122, History 2167, Geography 2248, Commercials (Accounts 7110, Commerce 7103).
• **A-Level (Form 5 - 6):** Pure Maths, Physics, Chemistry, Biology, Economics, Accounting, Business Studies, History, Literature.
• **CALA & Heritage-Based Education 5.0:** Project guidance and marking rubric tips.

What grade, form, or subject are you revising today?`;
  }

  if (/can i ask|can i ask you/i.test(norm)) {
    return `Yes! Ask me any ZIMSEC question: past paper problems, syllabus breakdowns, definitions, essay structuring, or exam techniques. Which level are you studying?`;
  }

  // GRADE SPECIFIC QUERIES
  if (/grade 5\b/i.test(norm)) {
    return `📚 *ZIMSEC Grade 5 Curriculum Breakdown:*

In Grade 5, learners deepen subject mastery across the 6 core national primary learning areas:

1. **Mathematics:**
   • Multi-digit multiplication and long division with remainders
   • Fractions: Proper, improper, mixed numbers, and finding common denominators
   • Decimals and introductory percentages (converting fractions to decimals)
   • Units of measurement: Length (km, m, cm), Mass (kg, g), Capacity (l, ml)
   • Calculating perimeter and area of squares and rectangles
   • Money transactions in USD and ZiG

2. **English Language:**
   • Continuous writing: Narrative and descriptive compositions (120 - 150 words)
   • Comprehension: Direct retrieval and contextual inference
   • Language structures: Direct and indirect speech, active/passive voice, tenses, prefixes and suffixes

3. **Indigenous Languages (Shona / Ndebele):**
   • Shona: Tsumo (proverbs), Madimikira (idioms), Nyaudzosingwi (ideophones), Rondedzero
   • Ndebele: Izaga (proverbs), Izitsho (idioms), Izenzukuthi, Ukubhala indaba

4. **Science and Technology:**
   • The human body: Digestive and circulatory systems
   • States of matter: Solids, liquids, and gases (melting, evaporation, condensation)
   • Energy: Light, sound, and electrical circuits
   • Computing: Input and output devices, file saving, and internet safety

5. **Agriculture:**
   • Soil types: Clay, sand, and loam; soil fertility and organic compost
   • Crop production: Maize, legumes, and vegetable garden care
   • Small livestock: Rearing poultry, rabbits, and pest control

6. **Social Sciences / Heritage Studies:**
   • National heritage: Great Zimbabwe, Victoria Falls (Mosi-oa-Tunya), Khami Ruins
   • National symbols: National flag colors, coat of arms, and national anthem
   • Community governance and unhu/ubuntu values

Would you like revision questions on Mathematics, Science, or English for Grade 5?`;
  }

  if (/grade 7\b/i.test(norm)) {
    return `🎓 *ZIMSEC Grade 7 National Examination Guide:*

Grade 7 candidates sit for **5 national examination papers**:
1. **Mathematics (Paper 1 Multiple Choice & Paper 2 Structured):** Number concepts, fractions, decimals, percentages, speed/distance/time, algebra, area, volume.
2. **English Language (Paper 1 Multiple Choice & Paper 2 Composition/Comprehension):** Guided composition writing, summary skills, and grammar.
3. **Indigenous Language (Shona 01 / Ndebele 02):** Paper 1 (Language structures, idioms, proverbs) and Paper 2 (Rondedzero/Indaba).
4. **General Paper 1 (Science & Technology, Agriculture):** Crop management, animal husbandry, environmental science, technology tools.
5. **General Paper 2 (Social Sciences & Heritage Studies):** Pre-colonial and post-colonial Zimbabwean history, constitution, civic duties.

*Scoring:* Results are graded in Units from **1 (Distinction)** to **9 (Fail)** per subject, where an aggregate of 5 Units is the best possible score!

Which Grade 7 topic would you like to review?`;
  }

  if (/grade [1-4]\b/i.test(norm)) {
    return `🏫 *ZIMSEC Junior Primary (Grade 1 to 4):*

• **Grade 1 & 2:** Focuses on foundational phonics, reading readiness, number recognition (1-100), simple addition/subtraction, environmental hygiene, and physical games.
• **Grade 3 & 4:** Transition to independent composition writing, multiplication tables (1 to 12), basic fractions, agriculture gardens, and community heritage.

Which grade level and subject do you need help with?`;
  }

  // O-LEVEL SPECIFIC QUERIES
  if (/o level|form 4|form 3|form 2|form 1|4004|4003|1122/i.test(norm)) {
    return `📘 *ZIMSEC O-Level Examination Master Guide:*

• **Mathematics (4004):**
  - *Paper 1 (Non-Calculator, 2.5 hrs):* Indices, standard form, fractions, sets, matrices, vectors, basic trigonometry, coordinate geometry.
  - *Paper 2 (Structured, 2.5 hrs):* Quadratic formula, graphs of functions, circle theorems, statistics, probability, 3D trigonometry, transformations.

• **Combined Science (4003):**
  - *Section A (Biology):* Cells, enzymes, photosynthesis, human reproduction, genetics.
  - *Section B (Chemistry):* Periodic table, bonding, stoichiometry, acids/bases, extraction of iron and copper.
  - *Section C (Physics):* Mechanics, Newton's laws, electricity (Ohm's law), waves, radioactivity.

• **English Language (1122):**
  - *Paper 1:* Section A (Free composition: narrative, argumentative, descriptive) and Section B (Guided report, speech, or formal letter).
  - *Paper 2:* Comprehension passage and compulsory 160-word summary.

*Key Command Words in Marking Schemes:*
• *"State/Name":* Direct factual answer without explanation.
• *"Describe":* Outline the characteristics or process step-by-step.
• *"Explain":* Provide reasons and scientific/mathematical justification.
• *"Evaluate":* Discuss both sides (merits and demerits) and give a reasoned conclusion.

Which O-Level subject are you studying right now?`;
  }

  // A-LEVEL SPECIFIC QUERIES
  if (/a level|form 6|form 5|pure math|advanced level/i.test(norm)) {
    return `🎓 *ZIMSEC A-Level (Form 5 & 6) Curriculum:*

• **Sciences:** Pure Mathematics (Calculus: differentiation & integration, vectors, complex numbers), Mechanics, Statistics, Physics, Chemistry, Biology, and Computer Science.
• **Commercials:** Accounting (Company accounts, partnerships, cash flow statements), Economics (Price elasticity, market structures, fiscal/monetary policy), Business Studies.
• **Humanities:** Literature in English, History (European 2167/1 & African 2167/2), Geography, Family & Religious Studies.

*Essay Strategy for A-Level Papers:*
Use the **PEEL structure** (Point, Evidence, Explanation, Link to question) for every analytical paragraph, and always provide an evaluation in your conclusion!

Which A-Level topic or past question can I assist you with?`;
  }

  // CALA
  if (/cala|continuous assessment/i.test(norm)) {
    return `📝 *ZIMSEC CALA (Continuous Assessment Learning Activity) Guide:*

CALA allows learners to apply classroom theory to real-world Zimbabwean challenges:
• **Structure:**
  1. *Background / Problem Statement:* The challenge being researched in your community.
  2. *Objectives:* Measurable outcomes of your project.
  3. *Methodology / Investigation:* Questionnaires, interviews, experiments, or field observation.
  4. *Evidence / Artifacts:* Photographs, charts, collected data, or physical models.
  5. *Findings & Recommendations:* What you discovered and your practical solutions.

Ensure all evidence is properly dated, authenticated by your teacher, and neatly presented according to your school's rubric!`;
  }

  return `📚 *ZIMSEC Educational Assistant:*

You asked about: "${text}".

In the ZIMSEC curriculum, every concept connects directly to syllabus objectives.
Tell me:
1. What grade or form level (ECD, Grade 1-7, Form 1-4 O-Level, Form 5-6 A-Level)?
2. Which subject (Maths, Science, English, Accounts, History, Geography, etc.)?

I will give you the exact notes, definitions, and exam techniques!`;
}

// ==========================================
// MAIN DISPATCHER
// ==========================================
export function generateBotResponse(contactId: string, userText: string): BotReply {
  let responseText = '';
  const delay = Math.floor(Math.random() * 250) + 600; // 600ms - 850ms natural typing

  switch (contactId) {
    case 'ai-assistant':
      responseText = handleAIAssistant(userText);
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
      responseText = handleDev(userText);
      break;
    case 'prisca-khumalo':
      responseText = handlePrisca(userText);
      break;
    case 'school':
      responseText = handleSchool(userText);
      break;
    default:
      responseText = handleAIAssistant(userText);
      break;
  }

  // Strictly enforce: No em dashes or en dashes anywhere
  responseText = responseText.replace(/[—–]/g, ':');

  return {
    text: responseText,
    delayMs: delay,
  };
}
