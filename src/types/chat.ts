export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[];
}

export interface Attachment {
  type: 'image' | 'video' | 'audio' | 'document' | 'contact' | 'poll';
  url?: string;
  name?: string;
  size?: string;
  mimeType?: string;
  contactData?: {
    name: string;
    phone: string;
    avatar?: string;
  };
  pollData?: {
    question: string;
    options: PollOption[];
    multipleAnswers?: boolean;
  };
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
  isStarred?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  about: string;
  status: string; // 'online' | 'offline' | 'last seen...'
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
