export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read';

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Attachment {
  type: 'image' | 'video' | 'audio' | 'document' | 'contact' | 'poll';
  url?: string;
  name?: string;
  size?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName?: string;
  text: string;
  timestamp: string;
  status: MessageStatus;
  isOutgoing: boolean;
  replyTo?: {
    id: string;
    text: string;
    senderName: string;
  };
  attachment?: Attachment;
  isVoiceNote?: boolean;
  voiceDuration?: string;
  reactions?: Record<string, number>;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  about: string;
  status: 'online' | 'offline' | 'typing...' | string;
  lastSeen?: string;
  isPinned?: boolean;
  isGroup?: boolean;
  isVerified?: boolean;
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTime?: string;
  lastMessageStatus?: MessageStatus;
  groupMembers?: string[];
}

export type FilterType = 'all' | 'unread' | 'favorites' | 'groups';
