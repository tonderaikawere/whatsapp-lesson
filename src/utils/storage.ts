import { Contact, Message } from '../types/chat';
import { initialContacts, initialMessages } from '../data/mockData';

const CONTACTS_KEY = 'wa_web_contacts_v4';
const MESSAGES_KEY = 'wa_web_messages_v4';

export const storage = {
  getContacts: (): Contact[] => {
    if (typeof window === 'undefined') return initialContacts;
    try {
      // Clean up legacy keys if present
      localStorage.removeItem('wa_web_contacts_v2');
      localStorage.removeItem('wa_web_contacts_v3');
      localStorage.removeItem('wa_web_messages_v2');
      localStorage.removeItem('wa_web_messages_v3');

      const data = localStorage.getItem(CONTACTS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c: Contact) => ({
            ...c,
            status: c.status?.toLowerCase().includes('typing') ? 'online' : (c.status || 'online'),
          }));
        }
      }
    } catch {
      // fallback
    }
    return initialContacts;
  },

  saveContacts: (contacts: Contact[]) => {
    if (typeof window === 'undefined') return;
    try {
      const cleanContacts = contacts.map((c) => ({
        ...c,
        status: c.status?.toLowerCase().includes('typing') ? 'online' : c.status,
      }));
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(cleanContacts));
    } catch (e) {
      console.warn('Storage quota exceeded for contacts', e);
    }
  },

  getMessages: (): Record<string, Message[]> => {
    if (typeof window === 'undefined') return initialMessages;
    try {
      const data = localStorage.getItem(MESSAGES_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return initialMessages;
  },

  saveMessages: (messages: Record<string, Message[]>) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Storage quota exceeded for messages', e);
    }
  },

  clearAllData: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CONTACTS_KEY);
    localStorage.removeItem(MESSAGES_KEY);
    localStorage.clear();
  },
};
