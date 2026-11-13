import { Contact, Message } from '../types/chat';
import { initialContacts, initialMessages } from '../data/mockData';

const CONTACTS_KEY = 'wa_web_contacts_v11';
const MESSAGES_KEY = 'wa_web_messages_v11';

export const storage = {
  getContacts: (): Contact[] => {
    if (typeof window === 'undefined') return initialContacts;
    try {
      // Actively purge all legacy versions
      const legacyKeys = [
        'wa_web_contacts',
        'wa_web_messages',
        'wa_web_contacts_v1',
        'wa_web_contacts_v2',
        'wa_web_contacts_v3',
        'wa_web_contacts_v4',
        'wa_web_contacts_v5',
        'wa_web_contacts_v6',
        'wa_web_contacts_v7',
        'wa_web_contacts_v8',
        'wa_web_contacts_v9',
        'wa_web_contacts_v10',
        'wa_web_messages_v1',
        'wa_web_messages_v2',
        'wa_web_messages_v3',
        'wa_web_messages_v4',
        'wa_web_messages_v5',
        'wa_web_messages_v6',
        'wa_web_messages_v7',
        'wa_web_messages_v8',
        'wa_web_messages_v9',
        'wa_web_messages_v10',
      ];
      legacyKeys.forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch {}
      });

      const data = localStorage.getItem(CONTACTS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c: Contact) => ({
            ...c,
            // Never allow stuck typing status
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
    try {
      localStorage.removeItem(CONTACTS_KEY);
      localStorage.removeItem(MESSAGES_KEY);
      localStorage.clear();
    } catch {}
  },
};
