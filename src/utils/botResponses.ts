export interface BotReply {
  text: string;
  delayMs?: number;
}

export function generateBotResponse(contactId: string, userText: string): BotReply {
  const clean = userText.trim().toLowerCase();

  // If chatting with Tonderai Kawere Portfolio Bot
  if (contactId === 'tonderai-bot') {
    if (clean.includes('who are you') || clean.includes('about') || clean.includes('intro')) {
      return {
        text: `Hello! 👋 I am Tonderai Kawere's Portfolio Assistant. Tonderai is a passionate Full-Stack Software Engineer specializing in modern web technologies, reactive user interfaces, and robust systems architecture.\n\n🌐 Explore my live portfolio: https://tonde-portfolio.vercel.app/\n\nFeel free to ask about my skills, projects, or background!`,
        delayMs: 1200,
      };
    }
    if (clean.includes('portfolio') || clean.includes('website') || clean.includes('link')) {
      return {
        text: `You can check out my official portfolio directly here:\n🔗 https://tonde-portfolio.vercel.app/\n\nIt features my production web apps, open-source projects, and technical case studies.`,
        delayMs: 1000,
      };
    }
    if (clean.includes('skills') || clean.includes('stack') || clean.includes('tech')) {
      return {
        text: `🛠️ **Core Tech Stack & Skills:**\n- **Frontend:** Next.js, React, TypeScript, Material UI (MUI), Tailwind CSS, Emotion\n- **Backend:** Node.js, Express, Python, REST APIs, GraphQL, WebSockets\n- **Databases:** PostgreSQL, MongoDB, Firebase Firestore, Redis\n- **DevOps & Cloud:** Git, Docker, CI/CD, Vercel, AWS\n- **Architecture:** Responsive Design, State Management, Accessibility (WCAG), Clean Code`,
        delayMs: 1400,
      };
    }
    if (clean.includes('contact') || clean.includes('hire') || clean.includes('email')) {
      return {
        text: `📬 Let's connect!\n- **Portfolio:** https://tonde-portfolio.vercel.app/\n- **GitHub:** https://github.com/tonderaikawere\n- **Email:** Contact available via my portfolio website!\n\nI'm open for collaboration, freelance opportunities, and software engineering roles.`,
        delayMs: 1100,
      };
    }
    if (clean.includes('why') || clean.includes('purpose') || clean.includes('educational')) {
      return {
        text: `📚 This WhatsApp Web chatbot interface was created by Tonderai Kawere as an **educational showcase**.\n\nIt demonstrates:\n1. Pixel-perfect reproduction of complex real-world web applications (WhatsApp Web UI)\n2. High-performance Next.js and Material UI component architecture\n3. Responsive layouts across desktop, tablet, and mobile\n4. Audio feedback using Web Audio API\n5. Rich conversational simulation without external API locks.`,
        delayMs: 1300,
      };
    }
    return {
      text: `Thanks for messaging Tonderai Kawere's showcase bot! 🚀\n\nYou can ask me about:\n- "portfolio" -> Link to https://tonde-portfolio.vercel.app/\n- "skills" -> Tech stack & specialties\n- "contact" -> How to reach Tonderai\n- "educational purpose" -> Why this app was built`,
      delayMs: 1000,
    };
  }

  // AI Assistant responses
  if (clean.includes('hello') || clean.includes('hi') || clean.includes('hey')) {
    return {
      text: `Hello there! 👋 Welcome to WhatsApp Web AI Assistant. How can I help you today? You can ask me questions about tech, coding, this app, or ask for quick assistance!`,
      delayMs: 900,
    };
  }

  if (clean.includes('how are you') || clean.includes('how are u')) {
    return {
      text: `I'm running smoothly at 60 frames per second! ⚡ How can I assist your coding or learning journey today?`,
      delayMs: 800,
    };
  }

  if (clean.includes('who made') || clean.includes('created') || clean.includes('developer') || clean.includes('author')) {
    return {
      text: `This WhatsApp Web clone was engineered by **Tonderai Kawere** as an educational project.\n\nCheck out Tonderai's portfolio here:\n👉 https://tonde-portfolio.vercel.app/`,
      delayMs: 1000,
    };
  }

  if (clean.includes('whatsapp') || clean.includes('official') || clean.includes('real')) {
    return {
      text: `⚠️ **Notice:** This is an open-source educational clone created for portfolio and learning purposes. It is **NOT** associated, endorsed, or affiliated with WhatsApp LLC, Meta, or any of their services.`,
      delayMs: 1000,
    };
  }

  if (clean.includes('help') || clean.includes('commands') || clean.includes('what can you do')) {
    return {
      text: `Here are things you can try in this WhatsApp Web clone:\n💬 Send any message and receive dynamic AI replies\n🎙️ Send simulated voice notes using the mic button\n📎 Click attachment to simulate sharing files or photos\n😀 Open the emoji selector\n🌓 Switch between Dark & Light mode via the top menu\n📜 View 10 open-source licenses\n👤 Check out developer Tonderai Kawere's profile!`,
      delayMs: 1200,
    };
  }

  if (clean.includes('joke')) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "Why do Java programmers have to wear glasses? Because they don't C#! 👓",
      "There are 10 types of people in the world: those who understand binary, and those who don't. 💻",
      "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?' 🍺",
    ];
    return {
      text: jokes[Math.floor(Math.random() * jokes.length)],
      delayMs: 1000,
    };
  }

  if (clean.includes('time') || clean.includes('date')) {
    const now = new Date();
    return {
      text: `🕒 Current server timestamp is: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on ${now.toDateString()}.`,
      delayMs: 700,
    };
  }

  // Default contextual echo / response
  return {
    text: `I received: "${userText}". 🤖\n\nThis is a fully reactive WhatsApp Web clone built with Next.js & Material UI by Tonderai Kawere (https://tonde-portfolio.vercel.app/).\n\nType "help" for interactive features!`,
    delayMs: 1100,
  };
}
