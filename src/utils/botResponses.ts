export interface BotReply {
  text: string;
  delayMs?: number;
}

export function generateBotResponse(contactId: string, userText: string): BotReply {
  const clean = userText.trim().toLowerCase();

  // Helper patterns
  const isGreeting = clean.includes('hello') || clean.includes('hi') || clean.includes('hey') || clean.includes('greetings') || clean.includes('sup') || clean.includes('yo');
  const isWhoIsTonde = clean.includes('who are you') || clean.includes('who is tonderai') || clean.includes('who is tonde') || clean.includes('about tonderai') || clean.includes('bio') || clean.includes('introduction') || clean.includes('intro');
  const isHireOrConnect = clean.includes('hire') || clean.includes('job') || clean.includes('opportunity') || clean.includes('work with') || clean.includes('collaborate') || clean.includes('contract') || clean.includes('freelance') || clean.includes('reach out');
  const isContact = clean.includes('contact') || clean.includes('email') || clean.includes('linkedin') || clean.includes('github') || clean.includes('phone') || clean.includes('connect');
  const isPortfolio = clean.includes('portfolio') || clean.includes('website') || clean.includes('link') || clean.includes('url');
  const isStackOrSkills = clean.includes('skill') || clean.includes('stack') || clean.includes('tech') || clean.includes('technologies') || clean.includes('language') || clean.includes('framework') || clean.includes('what can you do') || clean.includes('what can he build') || clean.includes('can tonderai build');
  const isProjects = clean.includes('project') || clean.includes('work') || clean.includes('experience') || clean.includes('mweya') || clean.includes('chicken inn') || clean.includes('eatwell') || clean.includes('nike') || clean.includes('jump start') || clean.includes('white lions');
  const isLocationOrTime = clean.includes('where are you') || clean.includes('location') || clean.includes('country') || clean.includes('city') || clean.includes('zimbabwe') || clean.includes('bulawayo') || clean.includes('timezone') || clean.includes('time zone') || clean.includes('time');
  const isValuesOrMotto = clean.includes('motto') || clean.includes('vibe') || clean.includes('philosophy') || clean.includes('brand');
  const isKawerify = clean.includes('kawerify') || clean.includes('company') || clean.includes('studio');
  const isUnknownPersonal = clean.includes('age') || clean.includes('how old') || clean.includes('married') || clean.includes('family') || clean.includes('salary');

  // Guard against unverified personal fabrication
  if (isUnknownPersonal) {
    return {
      text: `Tonderai hasn't shared that publicly — it's best to ask him directly via LinkedIn: https://www.linkedin.com/in/tonderaikawere/ or through his portfolio contact form! 😊`,
      delayMs: 700,
    };
  }

  // Handle HIRE or CONNECT
  if (isHireOrConnect) {
    return {
      text: `Are you looking to hire Tonderai for a project, collaborate on something, or just connect? 🤝\n\nHere is how Tonderai can add value:\n- 🚀 **Full-Stack Web & Mobile Contracts:** 3+ years delivering scalable solutions with React, React Native, Expo, Node.js, and Python/Django.\n- 📱 **Cross-Platform Apps:** Specializing in unified iOS, Android, and Web builds with Expo.\n- 🌍 **Local & Global Delivery:** Proven track record delivering systems across energy, hospitality, and e-commerce.\n\n📬 **Next Steps:**\n- **Portfolio Contact:** https://tonde-portfolio.vercel.app/\n- **LinkedIn:** https://www.linkedin.com/in/tonderaikawere/\n- **GitHub:** https://github.com/tonderaikawere\n\n*Note:* Tonderai is based in Bulawayo, Zimbabwe (CAT, UTC+2). He is highly responsive and usually replies within a day!`,
      delayMs: 800,
    };
  }

  // Handle WHO IS TONDERAI / BIO
  if (isWhoIsTonde) {
    return {
      text: `👨‍💻 **Tonderai Kawere** (or "Tonde" if casual) is a Zimbabwe-based Full-Stack Software Developer with 3+ years of experience building scalable web and mobile applications using React, React Native, Node.js, and modern cloud tools.\n\nHe has a proven track record delivering client solutions across energy, hospitality, e-commerce, and social impact sectors.\n\n✨ **Personal Motto:** *"I like solving messy problems with clean code."*\n🌐 **Live Portfolio:** https://tonde-portfolio.vercel.app/\n💼 **Status:** Open to new opportunities, collaborations, and connections!`,
      delayMs: 800,
    };
  }

  // Handle SKILLS & "CAN HE BUILD X?"
  if (isStackOrSkills) {
    return {
      text: `🛠️ **Tonderai Kawere's Technical Arsenal:**\n\n💻 **Frontend:**\n- JavaScript (ES6+) / TypeScript\n- React.js & Next.js\n- React Native & Expo (specializing in cross-platform iOS + Android + Web)\n- Flutter & Dart\n- HTML5, CSS3, Material UI (MUI), Tailwind CSS\n\n⚙️ **Backend & APIs:**\n- Node.js & Express\n- Python & Django\n- Firebase (Auth, Firestore, Hosting)\n- RESTful APIs & WebSockets\n\n🗄️ **Databases:**\n- PostgreSQL, MongoDB, Firebase Firestore\n\n☁️ **DevOps & Tools:**\n- AWS (Cloud architecture focus)\n- Vercel, Git / GitHub (1,072+ contributions in the last year)\n\n🎯 **Can Tonderai build your project?**\n- Web application? **Yes** (Next.js / React / Node)\n- Mobile application? **Yes** (Expo / React Native / Flutter)\n- Backend API? **Yes** (Node.js / Django)\n- E-Commerce / Ordering? **Yes** (Proven client deployments)`,
      delayMs: 900,
    };
  }

  // Handle PROJECTS & WORK EXPERIENCE
  if (isProjects) {
    return {
      text: `📂 **Notable Client & Portfolio Projects by Tonderai Kawere:**\n\n1. ⚡ **Mweya Green Energy:** Sustainability sector platform providing clean energy solutions (React/Next.js, responsive web).\n2. 🍗 **Chicken Inn Byo:** Real-world deployed restaurant ordering system for the beloved Zimbabwean brand.\n3. 🍽️ **Eatwell Restaurant:** Full-stack hospitality ordering platform with real-time order workflows.\n4. 👟 **Nike Zimbabwe:** E-commerce concept store demonstrating advanced modern shopping UX.\n5. 🧠 **Jump Start:** Mental health awareness movement platform creating positive community impact.\n6. 🦁 **White Lions Legacies:** Cultural heritage and legacy preservation web application.\n\n⭐ Over **1,072 GitHub contributions** in the past year! Explore live demos on his portfolio: https://tonde-portfolio.vercel.app/`,
      delayMs: 900,
    };
  }

  // Handle LOCATION / TIMEZONE
  if (isLocationOrTime) {
    return {
      text: `📍 **Location & Timezone:**\n- **City:** Bulawayo, Zimbabwe 🇿🇼\n- **Timezone:** Central Africa Time (CAT), UTC+2 (~6 hours ahead of US Eastern Time).\n- Comfortable collaborating with teams across Africa, Europe, the Americas, and globally!`,
      delayMs: 700,
    };
  }

  // Handle CONTACT
  if (isContact || isPortfolio) {
    return {
      text: `📬 **Connect with Tonderai Kawere:**\n- 🌐 **Portfolio:** https://tonde-portfolio.vercel.app/\n- 💼 **LinkedIn:** https://www.linkedin.com/in/tonderaikawere/\n- 🐙 **GitHub:** https://github.com/tonderaikawere\n- 🏢 **Company / Studio:** Kawerify Tech\n\n*"I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!"*`,
      delayMs: 800,
    };
  }

  // Handle KAWERIFY TECH
  if (isKawerify) {
    return {
      text: `🏢 **Kawerify Tech** is Tonderai Kawere's software studio through which he architects and ships client solutions across web, mobile, and cloud platforms.`,
      delayMs: 700,
    };
  }

  // Handle VALUES / MOTTO
  if (isValuesOrMotto) {
    return {
      text: `💬 **Tonderai's Vibe & Values:**\n- *"I like solving messy problems with clean code."*\n- Focused on clean, maintainable architecture that works well and looks great.\n- Passionate about continuous learning (currently advancing AWS cloud architecture and Expo cross-platform patterns).`,
      delayMs: 700,
    };
  }

  // GREETINGS
  if (isGreeting) {
    if (contactId === 'tonderai-bot') {
      return {
        text: `Hey there! 👋 Tonde here. Thanks for checking out my WhatsApp Web clone.\n\nFeel free to ask about my projects (Mweya Green Energy, Chicken Inn, Eatwell), my tech stack (React, Expo, Node.js), or how to connect! What can I help you with today?`,
        delayMs: 700,
      };
    }
    return {
      text: `Hello! 👋 Welcome to WhatsApp Web AI Chatbot.\n\nI can answer questions about Tonderai Kawere's portfolio, full-stack development, mobile apps with Expo, projects, or tell jokes and assist with anything! How can I help?`,
      delayMs: 700,
    };
  }

  // JOKES
  if (clean.includes('joke')) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "Why do Java programmers have to wear glasses? Because they don't C#! 👓",
      "There are 10 types of people in the world: those who understand binary, and those who don't. 💻",
      "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?' 🍺",
    ];
    return {
      text: jokes[Math.floor(Math.random() * jokes.length)],
      delayMs: 800,
    };
  }

  // DEFAULT
  return {
    text: `Got your message: "${userText}"! 👍\n\nI am the interactive AI assistant for **Tonderai Kawere** (Full-Stack Developer, Bulawayo, Zimbabwe).\n\nYou can ask me:\n- *"Who is Tonderai?"* -> Bio & background\n- *"What is his tech stack?"* -> React, Next.js, Expo, Node, AWS\n- *"What projects has he built?"* -> Mweya Green Energy, Chicken Inn, Eatwell, etc.\n- *"How do I hire or connect with him?"* -> Links to https://tonde-portfolio.vercel.app/ & LinkedIn!`,
    delayMs: 800,
  };
}
