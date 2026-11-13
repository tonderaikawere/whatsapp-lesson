export interface BotReply {
  text: string;
  delayMs?: number;
}

// Helper function to extract intent & sentiment
function analyzeInput(text: string) {
  const clean = text.trim().toLowerCase();
  return {
    raw: text.trim(),
    clean,
    words: clean.split(/\s+/),
    isGreeting: /^(hi|hello|hey|yo|sup|greetings|good\s*(morning|afternoon|evening)|howdy|salut|hie)\b/i.test(clean),
    isHowAreYou: /how\s*(are\s*you|r\s*u|are\s*things|is\s*it\s*going|you\s*doing|are\s*you\s*feeling)/i.test(clean),
    isSadOrStressed: /(sad|depressed|stressed|anxious|tired|overwhelmed|burnt\s*out|lonely|heartbroken|struggling|bad\s*day|crying|upset|exhausted)/i.test(clean),
    isHappyOrExcited: /(happy|excited|great|awesome|wonderful|blessed|good\s*news|celebrating|won|proud)/i.test(clean),
    isThankYou: /(thank|thanks|appreciated|bless\s*you|cheers)/i.test(clean),
    isJoke: /(joke|funny|laugh|make\s*me\s*laugh|humor)/i.test(clean),
    isQuestion: clean.endsWith('?') || /^(what|why|how|who|where|when|can\s*you|could\s*you|is\s*it|tell\s*me)\b/i.test(clean),
  };
}

// ==========================================
// 1. AI ASSISTANT (Smartest AI, Empathy, Grammar, Any Topic)
// ==========================================
function handleAIAssistant(text: string): string {
  const info = analyzeInput(text);
  const { clean, raw } = info;

  if (info.isHowAreYou) {
    const reflections = [
      `I am doing great, thank you for asking! 😊 More importantly, how are *you* doing today? What is on your mind?`,
      `Feeling sharp and ready to help! 🌟 How has your day been treating you so far?`,
      `I am doing wonderful! Enjoying our conversation. How are you feeling today? Anything exciting happening?`,
    ];
    return reflections[Math.floor(Math.random() * reflections.length)];
  }

  if (info.isSadOrStressed) {
    return `I am really sorry to hear that you are going through this right now. 💙 Take a deep breath.\n\nIt is completely okay to feel overwhelmed or tired sometimes — we are all human, and carrying heavy days takes strength.\n\nWould you like to vent and talk through what happened, or would you prefer a peaceful distraction or gentle advice? I am right here listening.`;
  }

  if (info.isHappyOrExcited) {
    return `That is fantastic to hear! 🎉 Your positive energy is contagious! Tell me more about what is making you feel this good — I would love to celebrate with you! ✨`;
  }

  if (info.isThankYou) {
    return `You are very welcome! 😊 It is always a pleasure assisting you. If you need anything else, just drop a message!`;
  }

  if (info.isGreeting) {
    const greetings = [
      `Hello there! 👋 It is wonderful to chat with you. How can I assist you today? We can dive into deep questions, explore ideas, or just chat casually!`,
      `Hey! Great to see you. How is your day going? Feel free to ask me anything — from complex science and logic to everyday advice!`,
      `Greetings! 🌟 I am here and all ears. What would you like to explore or talk about right now?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (info.isJoke) {
    const jokes = [
      `Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛😄`,
      `Why was the math book sad?\nBecause it had too many problems! 📐😂`,
      `There are 10 types of people in the world: those who understand binary, and those who don't! 💻`,
      `Why do bees have sticky hair?\nBecause they use honeycombs! 🍯🐝`,
      `What did the ocean say to the shore?\nNothing, it just waved! 🌊👋`,
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Grammar & Writing assistance
  if (/grammar|check\s*my|correct\s*this|proofread|rephrase/i.test(clean)) {
    return `I would love to help polish your writing! ✍️\n\nPlease share the sentence or paragraph you'd like me to review. I will check grammar, syntax, tone, and provide clearer, more elegant alternatives for you!`;
  }

  // Science / Philosophy / Tech / Math
  if (/philosophy|meaning\s*of\s*life|existential|consciousness/i.test(clean)) {
    return `That touches on one of humanity's deepest inquiries! 🌌\n\nPhilosophers from Aristotle to the Stoics and African thinkers centered around *Ubuntu* suggest that life's meaning isn't pre-packaged — it is created through meaningful connections, continuous learning, and leaving people better than you found them.\n\nWhat perspective on life resonates most with your own journey?`;
  }

  if (/quantum|ai|machine\s*learning|relativity|gravity/i.test(clean)) {
    return `Fascinating topic! 🔬\n\nWhen we examine concepts like that, the beauty lies in how simple foundational laws give rise to complex reality. For instance, in modern AI and computing, deep networks mimic pattern recognition that allows understanding context and nuance, just like we are doing right now!\n\nIs there a specific angle or question on this you want to break down further?`;
  }

  // Natural contextual response for any query
  return `That is a thoughtful point: "${raw}". 💡\n\nLooking at this, the key is understanding the underlying context and what you want to achieve. Everything connects through clear communication, thoughtful reflection, and practical execution.\n\nTell me a bit more about what you have in mind or what angle you'd like to explore next — I am here to help you unpack it!`;
}

// ==========================================
// 2. TONDE (Tonderai Kawere - Developer & Hire)
// ==========================================
function handleTonde(text: string): string {
  const info = analyzeInput(text);
  const { clean } = info;

  const isHireOrWork = /(hire|work|job|contract|freelance|build\s*me|develop|website|mobile\s*app|system|quote|pricing|rate|available|opportunity)/i.test(clean);
  const isContact = /(contact|reach|email|phone|whatsapp|linkedin|github|number|call)/i.test(clean);
  const isSkills = /(stack|tech|skills|technologies|languages|framework|react|next|expo|python|django|aws|database)/i.test(clean);
  const isProjects = /(projects|portfolio|mweya|chicken\s*inn|eatwell|nike|jump\s*start|white\s*lions|experience)/i.test(clean);
  const isWho = /(who\s*are\s*you|who\s*is\s*tonde|about\s*tonde|bio|background|location|where\s*are\s*you)/i.test(clean);

  if (isHireOrWork || isContact) {
    return `🤝 *Available for Work — Websites, Apps & Systems!*

I'm actively open for new projects, contracts, and full-stack development opportunities. Whether you need a high-performance web app, a cross-platform mobile app (iOS & Android with Expo/React Native), or custom business systems, I deliver clean, robust code that scales.

*Direct Ways to Reach Me:*
• 📱 *WhatsApp:* +263782528050
• 📧 *Email:* tondekawere@gmail.com
• 💼 *LinkedIn:* https://www.linkedin.com/in/tonderaikawere/
• 🌐 *Portfolio:* https://tonde-portfolio.vercel.app/

_Drop me a message on WhatsApp or email with your requirements and let's bring your vision to life!_ 🚀`;
  }

  if (isSkills) {
    return `🛠️ *Tonde's Technical Stack & Capabilities:*

• *Frontend:* React.js, Next.js (App Router, Turbopack), Material UI, Tailwind CSS, TypeScript
• *Mobile:* React Native, Expo (unified cross-platform for iOS, Android & Web), Flutter & Dart
• *Backend:* Node.js, Express, Python, Django, Firebase, REST APIs, WebSockets
• *Databases:* PostgreSQL, MongoDB, Firebase Firestore
• *Cloud & DevOps:* AWS, Vercel, Git/GitHub (1,072+ contributions in the past year)

🎯 *Motto:* _"I like solving messy problems with clean code."_

Ready to build something impactful? Reach out directly via WhatsApp at *+263782528050* or email *tondekawere@gmail.com*!`;
  }

  if (isProjects) {
    return `📂 *Key Real-World Projects Built by Tonde:*

1. ⚡ *Mweya Green Energy:* Sustainable clean energy platform and web presence.
2. 🍗 *Chicken Inn Byo:* High-efficiency restaurant ordering & ordering flow for Zimbabwe's iconic brand.
3. 🍽️ *Eatwell Restaurant:* Full-stack hospitality ordering and management platform.
4. 👟 *Nike Zimbabwe:* Dynamic e-commerce concept store.
5. 🧠 *Jump Start:* Mental health awareness community platform.
6. 🦁 *White Lions Legacies:* Cultural heritage preservation web application.

Check out live case studies on my portfolio: https://tonde-portfolio.vercel.app/!`;
  }

  if (isWho || info.isGreeting) {
    return `Hey! 👋 I'm **Tonderai Kawere** (or *Tonde* if casual) — a Full-Stack Software Developer based in **Bulawayo, Zimbabwe** (CAT, UTC+2) with 3+ years of professional engineering experience.

I serve as CTO at **Kawerify Tech** and love building clean, scalable products across web, mobile, and desktop platforms.

*Am available for any work — websites, apps, and systems!*
• WhatsApp: *+263782528050*
• Email: *tondekawere@gmail.com*
• LinkedIn: https://www.linkedin.com/in/tonderaikawere/

What kind of project or tech question can I help you with today?`;
  }

  if (info.isHowAreYou) {
    return `Doing great, building cool things with clean code! 💻 How are you doing? Let me know if you have any questions about my work, tech stack, or if you have a project you'd like to build together!`;
  }

  return `Thanks for your message! As a developer, I focus on crafting practical, elegant software solutions.

If you have a website, mobile app, or backend system you need built, *I am available for work!*
Reach me directly on WhatsApp (*+263782528050*) or email (*tondekawere@gmail.com*). What are your thoughts?`;
}

// ==========================================
// 3. KAWERIFY TECH (kawerifytech.com info & agency services)
// ==========================================
function handleKawerifyTech(text: string): string {
  const info = analyzeInput(text);
  const { clean } = info;

  if (/(service|offer|what\s*do\s*you\s*do|what\s*we\s*do)/i.test(clean)) {
    return `🏢 *Kawerify Tech Services:*

We build end-to-end digital experiences tailored for businesses and startups:
1. 🌐 *Custom Website Development:* Ultra-fast, SEO-optimized corporate sites, web apps, and portals built on Next.js & React.
2. 📱 *Cross-Platform Mobile Apps:* High-performance iOS and Android applications built with React Native, Expo, and Flutter.
3. 🎨 *UI/UX Design:* Human-centric prototyping, wireframing, and design systems in Figma.
4. 🛒 *E-Commerce & Payments:* Online stores integrated with local & global payment gateways (EcoCash, Paynow, Stripe).
5. 🗄️ *Database & Automation:* Custom CRM, management dashboards, and cloud workflows.
6. ☁️ *Cloud Hosting & Maintenance:* Scalable, secure cloud deployment and 24/7 technical support.

Visit our website: https://kawerifytech.com 🚀`;
  }

  if (/(contact|reach|location|address|office|phone|email|where)/i.test(clean)) {
    return `📍 *Kawerify Tech Contact & Location:*

• *Headquarters:* Gramps Way, Mbundane, Bulawayo, Zimbabwe 🇿🇼
• *Website:* https://kawerifytech.com
• *Email:* contact@kawerifytech.com
• *Phone:* +263 71 626 4988
• *CTO / Engineering Lead:* Tonderai Kawere

We work with clients locally across Zimbabwe and internationally across the globe!`;
  }

  if (/(new|update|latest|current)/i.test(clean)) {
    return `⚡ *What's New at Kawerify Tech:*

• We are actively rolling out modern *Expo cross-platform mobile app architectures* that allow businesses to launch simultaneously on iOS, Android, and Web from a single codebase.
• Integrating AI-driven customer support bots and automated order fulfillment pipelines for Zimbabwean businesses.
• Empowering local entrepreneurs with rapid MVP launches so they can validate their business ideas fast!

Got an idea you want to launch? Let's discuss it at https://kawerifytech.com!`;
  }

  return `Welcome to **Kawerify Tech**! 🏢🚀

We are a software development and digital agency based in **Bulawayo, Zimbabwe** (Gramps Way, Mbundane), co-founded by CTO Tonderai Kawere.

We transform business ideas into world-class software:
• Custom Websites & Web Applications
• iOS & Android Mobile Apps
• Custom Enterprise Databases & Automations

🌐 *Website:* https://kawerifytech.com
📧 *Email:* contact@kawerifytech.com
📱 *Phone:* +263 71 626 4988

How can we assist your business today?`;
}

// ==========================================
// 4. SIMBA (Life Guide & Philosophy)
// ==========================================
function handleSimba(text: string): string {
  const info = analyzeInput(text);
  const { clean } = info;

  if (info.isSadOrStressed || /(struggle|hard|fail|lost|pain|hurt|depressed)/i.test(clean)) {
    return `I hear you, my friend. Sit down with me for a moment. 🌿\n\nLife has seasons. Some seasons are like winter where everything feels barren and cold, but underneath the soil, roots are growing deeper and stronger. You cannot appreciate the sunrise without walking through the night.\n\nDo not judge your entire story by one difficult chapter. Be gentle with yourself today. What is weighing most on your heart? Let it out.`;
  }

  if (/(purpose|meaning|why\s*are\s*we\s*here|direction|destiny)/i.test(clean)) {
    return `Purpose is not something you stumble upon in the street like lost money — purpose is something you forge with your hands and your heart. 🌟\n\nIt is found at the intersection of:
1. What you genuinely care about,
2. What you can become good at, and
3. How you can serve or uplift another person.

As our ancestors taught us in *Ubuntu*: *"Umuntu ngumuntu ngabantu"* (A person is a person through other persons). When you pour goodness into others, your own life fills up. What is something you feel drawn to create or solve?`;
  }

  if (/(fear|afraid|scared|anxiety|future|worry)/i.test(clean)) {
    return `Worry is like paying interest on a debt you may never owe. 🕊️\n\nAlmost 90% of the things we lose sleep over never actually happen, and the 10% that do, we find the strength to face when they arrive. Bring your attention back to right now. You only have to live this single breath, this single hour.\n\nTake control of what is in your hands today, and leave tomorrow to tomorrow.`;
  }

  if (info.isHowAreYou || info.isGreeting) {
    return `Greetings, my brother/sister! 🦁 I am at peace, grounded, and thankful for the gift of another day. Life is a journey of continuous learning.\n\nHow is your spirit doing today? Tell me what has been on your mind.`;
  }

  return `Life is a mirror: if you frown at it, it frowns back; if you smile at it, it smiles with you. 🌿\n\nEvery experience you go through, whether sweet or bitter, is shaping your character. Remember that patience (*kushingirira*) and integrity never go out of style.\n\nWhat are your thoughts on this? I am always here to share wisdom and walk with you.`;
}

// ==========================================
// 5. STARTUPS (Everything About Starting a Business)
// ==========================================
function handleStartups(text: string): string {
  const info = analyzeInput(text);
  const { clean } = info;

  if (/(idea|how\s*to\s*start|begin|launch|step)/i.test(clean)) {
    return `🚀 *The 5-Step Blueprint to Launching a Startup:*

1. **Find an Expensive, Painful Problem:** Don't start with a solution looking for a problem. Find where people are actively losing time, money, or peace of mind.
2. **Talk to 20 Potential Customers (Customer Discovery):** Never ask _"Would you buy this?"_ (they will say yes to be polite). Ask: _"How do you solve this problem today? How much did that cost you? What was the hardest part?"_
3. **Build an MVP (Minimum Viable Product):** Strip down your idea to its single most valuable feature. Launch in days/weeks, not months.
4. **Validate Willingness to Pay:** A business begins when someone actually pays you or signs a letter of intent.
5. **Iterate Fast:** Listen to user behavior, not just user words, and refine your product-market fit.

What problem are you thinking of tackling? Let's dissect it!`;
  }

  if (/(funding|investor|pitch|raise|capital|vc|angel|bootstrap)/i.test(clean)) {
    return `💼 *Startup Funding: Bootstrapping vs. Raising Capital*

• **Bootstrapping (Recommended Early On):** You fund the business from initial revenue and customer cash flow. You retain 100% equity, stay nimble, and build real discipline.
• **Raising Angel/Seed Capital:** Look for investors only when you have a proven engine and adding fuel (capital) will accelerate growth.

*What Investors Care About:*
1. **Traction:** Paying customers, growth rate, retention.
2. **Team:** Can this team execute under pressure?
3. **Market Size (TAM):** Is this a million-dollar or hundred-million-dollar opportunity?
4. **Moat / Unfair Advantage:** Why you, and why now?

Need help structuring a 10-slide pitch deck or calculating your valuation? Just ask!`;
  }

  if (/(marketing|growth|customer|acquire|sales|cac|ltv)/i.test(clean)) {
    return `📈 *Customer Acquisition & Growth Engine:*

The golden rule of startup unit economics: **LTV (Lifetime Value) must be at least 3x your CAC (Customer Acquisition Cost)**, and CAC payback should ideally be under 12 months.

*Top Channels to Test:*
• **Cold Outreach & Direct Sales:** Best for B2B. Directly message decision makers on LinkedIn or WhatsApp.
• **Content & SEO:** Educate your audience on the problem you solve.
• **Word-of-Mouth & Referral Loops:** Build a product so remarkably good that users can't help telling their peers.
• **Partnerships:** Team up with non-competing businesses already serving your exact customer.

Which channel are you currently testing?`;
  }

  return `💡 *Startup Hub:* Welcome! I am your go-to startup and business strategy partner.\n\nWhether you need help with:\n• *Validating your idea*\n• *Building an MVP on a budget*\n• *Pricing strategies and unit economics*\n• *Pitching to investors & pitch decks*\n• *Navigating the Zimbabwean and African market*\n\nTell me about your business idea or where you are feeling stuck right now!`;
}

// ==========================================
// 6. KHUMBULANI SIBANDA (Go-to Casual Friend)
// ==========================================
function handleKhumbulani(text: string): string {
  const info = analyzeInput(text);
  const { clean, raw } = info;

  if (info.isHowAreYou) {
    return `Eish, my guy! I'm doing sharp, hanging in there and keeping the vibe alive! 😎 How are you doing yourself? How was your day?`;
  }

  if (info.isGreeting) {
    return `Bho here, shamwari! 👋 Kunjani? Great to hear from you! What's the latest gossip, plans, or what are we cooking today?`;
  }

  if (/(bored|tired|chill|weekend|plans|party|food|eat|hungry)/i.test(clean)) {
    return `Haha, I feel you 100%! When boredom hits, you either need a proper braai with some good music, a deep YouTube rabbit hole, or just a good laugh with people who get you. What are you up to right now?`;
  }

  if (/(football|soccer|premier\s*league|arsenal|chelsea|man\s*u|liverpool|real\s*madrid|barca)/i.test(clean)) {
    return `Now you're talking my language! ⚽ Football is pure emotion. Who is your team and what do you think of their recent form? Let's debate!`;
  }

  if (info.isJoke) {
    return `Haha listen to this one: Why did the computer go to the doctor?\nBecause it caught a virus and had a hard drive! 😂\n\nClassic! Tell me what's new on your end.`;
  }

  return `You already know I'm always here to chat about whatever, whenever! "${raw}" — man, that's interesting! Tell me more about that, or let's switch gears to whatever you feel like talking about! I'm all ears. 👊🔥`;
}

// ==========================================
// 7. DEV (HTML, CSS, JS Web Mentor)
// ==========================================
function handleDev(text: string): string {
  const info = analyzeInput(text);
  const { clean } = info;

  if (/(html|tag|elements|structure)/i.test(clean)) {
    return `💻 *HTML Fundamentals (The Skeleton):*

HTML provides structure using elements and semantic tags:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Website</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <p>This is where your main content lives!</p>
    <button id="myBtn">Click Me</button>
  </main>
  <script src="script.js"></script>
</body>
</html>
\`\`\`

*Key Tip:* Always include the viewport meta tag so your site renders responsively on mobile phones!`;
  }

  if (/(css|style|responsive|flexbox|grid|media\s*query)/i.test(clean)) {
    return `🎨 *Responsive CSS (The Styling & Layout):*

Modern responsive web design relies on **Flexbox** and **Media Queries**:

\`\`\`css
/* Clean Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Responsive Flex Container */
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Mobile Responsiveness (Screen width under 768px) */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Stacks vertically on phone! */
    gap: 15px;
    text-align: center;
  }
}
\`\`\`

Want me to show you how to center a div or build a responsive navbar? Just ask!`;
  }

  if (/(javascript|js|dom|button|click|fetch)/i.test(clean)) {
    return `⚡ *JavaScript (The Brain & Interactivity):*

Here is how you connect HTML elements with interactive JavaScript:

\`\`\`javascript
// 1. Select the button
const btn = document.getElementById('myBtn');

// 2. Listen for clicks
btn.addEventListener('click', () => {
  btn.textContent = 'Awesome! Clicked 🎉';
  btn.style.backgroundColor = '#008069';
  btn.style.color = '#ffffff';
});

// 3. Fetching data from an API
async function loadData() {
  try {
    const response = await fetch('https://api.github.com/users/tonderaikawere');
    const data = await response.json();
    console.log('GitHub Bio:', data.bio);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
loadData();
\`\`\`

What feature do you want to build next in your web project?`;
  }

  return `👨🏾‍💻 *Dev Web Mentor:* Hey there! Ready to write some clean code?

I'm here to help you master:
• *HTML5:* Clean, semantic tags for solid structure
• *CSS3:* Responsive layouts, Flexbox, Grid, animations, and mobile media queries
• *JavaScript:* DOM events, functions, async/await, and modern ES6+

Tell me what you're working on, paste code you need help fixing, or tell me what component you want to build!`;
}

// ==========================================
// 8. PRISCA KHUMALO (Sweetest, Creative Ideas & Jokes)
// ==========================================
function handlePrisca(text: string): string {
  const info = analyzeInput(text);
  const { clean } = info;

  if (info.isJoke || /(laugh|funny)/i.test(clean)) {
    const jokes = [
      `Haha, okay check this one out! 😂\n\nWhy don't eggs tell each other jokes?\nBecause they'd crack up! 🥚✨`,
      `Here is a cute one for you! 🌸\n\nWhat do you call a bear with no teeth?\nA gummy bear! 🐻🍬`,
      `Why did the tomato blush?\nBecause it saw the salad dressing! 🍅😆`,
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (info.isSadOrStressed) {
    return `Oh no, please send me a virtual hug right now! 🫂💖\n\nI am sending you the warmest, brightest energy. Remember how incredible, resilient, and special you are. Heavy days come, but they never stay forever. You're going to get through this, and tomorrow has so much potential to be better.\n\nTake it easy today, treat yourself to something nice, and remember I'm always cheering for you! ✨🌸`;
  }

  if (/(idea|brainstorm|creative|project|bored)/i.test(clean)) {
    const ideas = [
      `Ooooh, I love brainstorming! 💡 How about designing a super cute personal mood board or a digital recipe scrapbook of favorite Zimbabwean meals like isitshwala/sadza with beef stew? 🍲`,
      `Idea alert! 🎨 What if you create a 30-day kindness or gratitude challenge? Every day you send one genuine appreciation message to someone who made your life better!`,
      `Here is a fun one! 🎧 Create a themed playlist called 'Pure Joy' with songs that make you want to dance immediately, and design custom cover art for it!`,
    ];
    return ideas[Math.floor(Math.random() * ideas.length)];
  }

  if (info.isGreeting || info.isHowAreYou) {
    return `Awww hello sunshine! 🌸✨ I am doing wonderfully, feeling so happy to see your message! How are you doing? Tell me everything — I want all the tea and good vibes! 🥰`;
  }

  return `You are such a delight to talk to! ✨💖 I love your energy. Whatever you are working on or thinking about, remember to believe in yourself and have fun with it. What else is on your mind? Let's brainstorm or share another laugh! 🌸`;
}

// ==========================================
// 9. SCHOOL (ZIMSEC Only, ECD to Form 6)
// ==========================================
function handleSchool(text: string): string {
  const info = analyzeInput(text);
  const { clean } = info;

  if (/(o\s*level|form\s*4|form\s*3|form\s*2|form\s*1)/i.test(clean)) {
    return `📚 *ZIMSEC O-Level Curriculum Guide (Form 1 - 4):*

• **Key Syllabi Covered:**
  - *Mathematics (4004):* Algebra, Quadratic equations, Trigonometry, Vectors, Matrices, Statistics, Probability, Transformation.
  - *Combined Science (4003):* Biology (Cells, Enzymes, Transport, Genetics), Chemistry (Atomic structure, Periodic table, Acids/Bases, Metals), Physics (Forces, Energy, Electricity, Waves).
  - *English Language (1122):* Paper 1 (Free composition & guided writing), Paper 2 (Comprehension, summary writing & language register).
  - *Heritage Studies & History (2167):* Pre-colonial societies (Great Zimbabwe, Mutapa, Rozvi), Colonial era, First and Second Chimurenga, Constitution.
  - *Commercials:* Principles of Accounts (7110), Commerce (7103), Business Enterprise Skills.

*Exam Tip:* In ZIMSEC papers, pay attention to command words: *"State"* requires a brief fact, *"Explain"* requires a reason with evidence, and *"Evaluate"* requires looking at both advantages and disadvantages!

Which subject or topic would you like revision on?`;
  }

  if (/(a\s*level|form\s*6|form\s*5|advanced)/i.test(clean)) {
    return `🎓 *ZIMSEC A-Level Curriculum Guide (Form 5 - 6):*

• **Sciences:** Pure Mathematics (Calculus, Differentiation, Integration, Complex Numbers), Mechanics, Statistics, Physics, Chemistry, Biology, Computer Science.
• **Commercials:** Accounting (Partnership, Company accounts, Ratios, Manufacturing), Economics (Micro & Macro, Fiscal & Monetary policies), Business Studies.
• **Arts & Humanities:** Literature in English, History (European & African), Geography, Divinity, Shona, Ndebele, Family & Religious Studies.

*Exam Strategy:* A-Level ZIMSEC marking schemes reward deep analytical essay structure: introduction with thesis statement, well-developed paragraphs with PEEL (Point, Evidence, Explanation, Link), and a balanced conclusion.

Which subject or past-paper problem are you tackling?`;
  }

  if (/(primary|grade\s*7|grade\s*1|grade\s*2|grade\s*3|grade\s*4|grade\s*5|grade\s*6|ecd)/i.test(clean)) {
    return `🏫 *ZIMSEC Primary & ECD Curriculum:*

• **ECD A & ECD B:** Physical play, early sensory development, storytelling, foundational language and numeracy, social habits.
• **Junior School (Grade 1 - 7):**
  - English & Indigenous Languages (Shona / Ndebele)
  - Mathematics (Four basic operations, Fractions, Money, Units of measure, Time)
  - Science & Technology
  - Agriculture, Food & Natural Systems
  - Social Sciences (Family, Heritage, Community life)
  - Physical Education & Arts

Need help explaining a primary school concept simply for Grade 7 exam preparation? Let me know!`;
  }

  return `📚 *ZIMSEC School Research Assistant:*

I specialize strictly in the **ZIMSEC (Zimbabwe School Examinations Council)** curriculum from **ECD through Form 6 (A-Level)**.

*Ask me about:*
• Syllabi breakdowns & key topics
• Past exam question techniques & marking schemes
• CALA (Continuous Assessment Learning Activities) guidance
• Revision summaries for Maths, Combined Science, English, Accounts, History, and more!

What grade, form, or subject are you studying today?`;
}

// ==========================================
// MAIN DISPATCHER
// ==========================================
export function generateBotResponse(contactId: string, userText: string): BotReply {
  let responseText = '';
  const delay = Math.floor(Math.random() * 300) + 700; // 700ms - 1000ms realistic typing

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
      // Fallback handles gracefully with smart AI Assistant
      responseText = handleAIAssistant(userText);
      break;
  }

  return {
    text: responseText,
    delayMs: delay,
  };
}
