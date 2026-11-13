import { Contact, Message } from '../types/chat';

export const initialContacts: Contact[] = [
  // ===============================
  // PINNED CHATS (1 to 3)
  // ===============================
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    avatar: '🤖',
    phone: '+263 800 555 0199',
    about: 'Smartest AI of all • Deep empathy, grammar, philosophy & any question',
    status: 'online',
    isPinned: true,
    isVerified: true,
    unreadCount: 0,
    lastMessage: 'Hello! 👋 I am your AI Assistant. How can I help you today?',
    lastMessageTime: '10:30',
    lastMessageStatus: 'read',
  },
  {
    id: 'tonde',
    name: 'Tonde',
    avatar: '👨‍💻',
    phone: '+263 78 252 8050',
    about: 'Full-Stack Developer • Bulawayo, Zimbabwe • Available for websites, apps & systems',
    status: 'online',
    isPinned: true,
    isVerified: true,
    unreadCount: 0,
    lastMessage: 'Am available for any work — websites, apps, and systems! Reach me on WhatsApp: +263782528050',
    lastMessageTime: '10:25',
    lastMessageStatus: 'read',
  },
  {
    id: 'kawerify-tech',
    name: 'Kawerify Tech',
    avatar: '🏢',
    phone: '+263 71 626 4988',
    about: 'Software studio in Bulawayo • Websites, Apps & Systems • kawerifytech.com',
    status: 'online',
    isPinned: true,
    isVerified: true,
    unreadCount: 0,
    lastMessage: 'Welcome to Kawerify Tech! Visit https://kawerifytech.com to see our latest digital solutions.',
    lastMessageTime: '10:20',
    lastMessageStatus: 'read',
  },

  // ===============================
  // NOT PINNED CHATS (1 to 6)
  // ===============================
  {
    id: 'simba',
    name: 'Simba',
    avatar: '🦁',
    phone: '+263 77 111 2233',
    about: 'Life guide & wisdom • Grounded answers to everything about life',
    status: 'online',
    isPinned: false,
    unreadCount: 0,
    lastMessage: '',
    lastMessageTime: '',
  },
  {
    id: 'startups',
    name: 'Startups',
    avatar: '💡',
    phone: '+263 77 333 4455',
    about: 'Startup specialist • Everything about launching, funding & scaling a business',
    status: 'online',
    isPinned: false,
    unreadCount: 0,
    lastMessage: '',
    lastMessageTime: '',
  },
  {
    id: 'khumbulani-sibanda',
    name: 'Khumbulani Sibanda',
    avatar: '🧑🏾',
    phone: '+263 77 555 6677',
    about: 'Your go-to person to chat about anything, anytime',
    status: 'online',
    isPinned: false,
    unreadCount: 0,
    lastMessage: '',
    lastMessageTime: '',
  },
  {
    id: 'dev',
    name: 'Dev',
    avatar: '👨🏾‍💻',
    phone: '+263 77 777 8899',
    about: 'Web mentor • Start building responsive HTML, CSS & JavaScript websites',
    status: 'online',
    isPinned: false,
    unreadCount: 0,
    lastMessage: '',
    lastMessageTime: '',
  },
  {
    id: 'prisca-khumalo',
    name: 'Prisca Khumalo',
    avatar: '🌸',
    phone: '+263 77 888 9900',
    about: 'The sweetest person • Creative ideas, jokes & positive vibes',
    status: 'online',
    isPinned: false,
    unreadCount: 0,
    lastMessage: '',
    lastMessageTime: '',
  },
  {
    id: 'school',
    name: 'School',
    avatar: '🎓',
    phone: '+263 77 999 0011',
    about: 'ZIMSEC specialist • Comprehensive research from ECD to Form 6',
    status: 'online',
    isPinned: false,
    unreadCount: 0,
    lastMessage: '',
    lastMessageTime: '',
  },
];

export const initialMessages: Record<string, Message[]> = {
  'ai-assistant': [
    {
      id: 'ai-welcome',
      senderId: 'ai-assistant',
      senderName: 'AI Assistant',
      text: 'Hello! 👋 I am your AI Assistant — here to chat, answer questions with deep insight, explore ideas, or just talk through whatever is on your mind. How are you feeling today?',
      timestamp: '10:30',
      status: 'read',
      isOutgoing: false,
    },
  ],
  'tonde': [
    {
      id: 'tonde-welcome',
      senderId: 'tonde',
      senderName: 'Tonde',
      text: `Hey! 👋 I am Tonde's AI assistant.

I know everything about **Tonderai Kawere** — his 3+ years experience, full-stack tech stack (React, Next.js, Expo, React Native, Node.js, Python/Django, AWS), and projects (*Mweya Green Energy*, *Chicken Inn Byo*, *Eatwell*, *Nike Zimbabwe*).

💼 *Am available for any work — websites, apps, and systems!*
If you'd like to chat with me directly or discuss a project:
• 📱 *WhatsApp:* +263782528050
• 📧 *Email:* tondekawere@gmail.com
• 💼 *LinkedIn:* https://www.linkedin.com/in/tonderaikawere/
• 🌐 *Portfolio:* https://tonde-portfolio.vercel.app/

How can I help you today?`,
      timestamp: '10:25',
      status: 'read',
      isOutgoing: false,
    },
  ],
  'kawerify-tech': [
    {
      id: 'kawerify-welcome',
      senderId: 'kawerify-tech',
      senderName: 'Kawerify Tech',
      text: `Welcome to **Kawerify Tech**! 🏢🚀

We are a software development studio based in **Bulawayo, Zimbabwe** (Gramps Way, Mbundane), co-founded by CTO Tonderai Kawere.

We build:
• 🌐 Custom Responsive Websites & Web Apps (Next.js & React)
• 📱 Cross-Platform Mobile Apps (React Native, Expo & Flutter)
• 🛒 E-Commerce & Payment Gateways
• 🗄️ Custom Databases & Business Automation Systems

Visit us at: https://kawerifytech.com
Email: contact@kawerifytech.com | Phone: +263 71 626 4988

How can we assist your business or startup today?`,
      timestamp: '10:20',
      status: 'read',
      isOutgoing: false,
    },
  ],
};
