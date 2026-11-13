'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import ThemeRegistry, { useColorMode } from '../components/ThemeRegistry';
import SidebarHeader, { SidebarView } from '../components/Sidebar/SidebarHeader';
import NotificationBanner from '../components/Sidebar/NotificationBanner';
import SearchBar from '../components/Sidebar/SearchBar';
import FilterChips from '../components/Sidebar/FilterChips';
import ChatList from '../components/Sidebar/ChatList';
import ChatHeader from '../components/Chat/ChatHeader';
import MessageList from '../components/Chat/MessageList';
import ChatInput from '../components/Chat/ChatInput';
import ProfilePage from '../components/Pages/ProfilePage';
import LicensesPage from '../components/Pages/LicensesPage';
import StatusPage from '../components/Pages/StatusPage';
import NewChatPage from '../components/Pages/NewChatPage';
import CommunitiesPage from '../components/Pages/CommunitiesPage';
import ContactInfoPage from '../components/Pages/ContactInfoPage';
import StorySlideView from '../components/Pages/StorySlideView';
import CallScreenView from '../components/Pages/CallScreenView';
import PollDialog from '../components/Modals/PollDialog';
import { Contact, Message, FilterType, Attachment } from '../types/chat';
import { storage } from '../utils/storage';
import { sounds } from '../utils/sound';
import { notifications } from '../utils/notifications';
import { generateBotResponse } from '../utils/botResponses';

type MainView = 'chat' | 'contact-info' | 'story' | 'call';

function ChatAppContent() {
  const { mode } = useColorMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Views state (In-place sliding panels/pages, No Popups!)
  const [sidebarView, setSidebarView] = useState<SidebarView>('chat-list');
  const [mainView, setMainView] = useState<MainView>('chat');
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  // Contacts and messages state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeContactId, setActiveContactId] = useState<string>('ai-assistant');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // In-Chat Search state
  const [showInChatSearch, setShowInChatSearch] = useState(false);
  const [inChatSearchQuery, setInChatSearchQuery] = useState('');

  // Replying state
  const [replyingToMessage, setReplyingToMessage] = useState<Message | null>(null);

  // Typing status & safety ref
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile navigation state
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Call screen state
  const [callIsVideo, setCallIsVideo] = useState(false);

  // Poll Dialog state
  const [pollDialogOpen, setPollDialogOpen] = useState(false);

  // Load from device storage on mount
  useEffect(() => {
    const storedContacts = storage.getContacts();
    const storedMessages = storage.getMessages();
    setContacts(storedContacts);
    setMessagesMap(storedMessages);
    setIsLoaded(true);
  }, []);

  // Save to device storage when messages or contacts update
  useEffect(() => {
    if (isLoaded) {
      storage.saveContacts(contacts);
    }
  }, [contacts, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      storage.saveMessages(messagesMap);
    }
  }, [messagesMap, isLoaded]);

  // Dynamic Browser Tab Title updating with unread messages
  useEffect(() => {
    const totalUnread = contacts.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
    if (totalUnread > 0) {
      document.title = `(${totalUnread}) WhatsApp Web`;
    } else {
      document.title = 'WhatsApp Web';
    }
  }, [contacts]);

  // Clean up typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0] || {
    id: 'ai-assistant',
    name: 'WhatsApp AI Assistant',
    avatar: '🤖',
    phone: '',
    about: '',
    status: 'online',
  };

  const rawMessages = messagesMap[activeContactId] || [];

  // Filter messages in current chat (in-chat search)
  const activeMessages = rawMessages.filter((m) => {
    if (showInChatSearch && inChatSearchQuery.trim()) {
      const q = inChatSearchQuery.toLowerCase();
      const matchText = m.text?.toLowerCase().includes(q);
      const matchAttachment = m.attachment?.name?.toLowerCase().includes(q);
      return matchText || matchAttachment;
    }
    return true;
  });

  // Filter contacts in sidebar
  const filteredContacts = contacts.filter((c) => {
    const contactMsgs = messagesMap[c.id] || [];
    const lastMsg = contactMsgs[contactMsgs.length - 1];
    const lastMsgText = lastMsg
      ? (lastMsg.attachment ? lastMsg.attachment.name || lastMsg.attachment.type : lastMsg.text)
      : '';

    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lastMsgText.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (showUnreadOnly || filterType === 'unread') {
      return (c.unreadCount || 0) > 0;
    }
    if (filterType === 'favorites') {
      return c.isPinned;
    }
    if (filterType === 'groups') {
      return c.isGroup;
    }
    return true;
  });

  // Sort contacts just like WhatsApp: Pinned chats on top, and sorted by most recent message
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    const timeA = a.lastMessageTimestamp || 0;
    const timeB = b.lastMessageTimestamp || 0;
    return timeB - timeA;
  });

  const handleSelectContact = (contact: Contact) => {
    // If switching chat while someone was typing, clear any stuck indicator
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setActiveContactId(contact.id);
    setMainView('chat');
    setShowMobileChat(true);
    setShowInChatSearch(false);
    setInChatSearchQuery('');

    // Mark as read
    if (contact.unreadCount && contact.unreadCount > 0) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, unreadCount: 0 } : c))
      );
    }
  };

  const handleSendMessage = (text: string, attachment?: Attachment) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: timeStr,
      status: 'delivered',
      isOutgoing: true,
      attachment,
      replyTo: replyingToMessage
        ? {
            id: replyingToMessage.id,
            text: replyingToMessage.text || replyingToMessage.attachment?.name || 'Attachment',
            senderName: replyingToMessage.senderName || (replyingToMessage.isOutgoing ? 'You' : activeContact.name),
          }
        : undefined,
    };

    setReplyingToMessage(null);

    // Update messages
    setMessagesMap((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg],
    }));

    // Update contacts list last message & timestamp
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContactId
          ? {
              ...c,
              lastMessage: attachment ? `📎 ${attachment.type}` : text,
              lastMessageTime: timeStr,
              lastMessageStatus: 'delivered',
              lastMessageTimestamp: Date.now(),
            }
          : c
      )
    );

    // Play outgoing sound
    sounds.playSent();

    // Trigger intelligent persona response
    const currentChatId = activeContactId;

    // Show typing briefly (never stuck)
    setIsTyping(true);
    setContacts((prev) =>
      prev.map((c) => (c.id === currentChatId ? { ...c, status: 'typing...' } : c))
    );

    const reply = generateBotResponse(currentChatId, text || attachment?.name || '');
    const delay = reply.delayMs || 800;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);

      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMsg: Message = {
        id: `reply-${Date.now()}`,
        senderId: currentChatId,
        senderName: activeContact.name,
        text: reply.text,
        timestamp: botTime,
        status: 'read',
        isOutgoing: false,
      };

      setMessagesMap((prev) => {
        const updated = (prev[currentChatId] || []).map((m) =>
          m.isOutgoing ? { ...m, status: 'read' as const } : m
        );
        return {
          ...prev,
          [currentChatId]: [...updated, botMsg],
        };
      });

      // Ensure contact returns to 'online' status immediately!
      setContacts((prev) =>
        prev.map((c) =>
          c.id === currentChatId
            ? {
                ...c,
                status: 'online',
                lastMessage: reply.text.slice(0, 50) + (reply.text.length > 50 ? '...' : ''),
                lastMessageTime: botTime,
                lastMessageStatus: 'read',
                lastMessageTimestamp: Date.now(),
              }
            : c
        )
      );

      sounds.playReceived();
      notifications.notify(activeContact.name, reply.text);
    }, delay);
  };

  const handleSendVoiceNote = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      id: `vn-${Date.now()}`,
      senderId: 'me',
      text: 'Voice message',
      timestamp: timeStr,
      status: 'delivered',
      isOutgoing: true,
      isVoiceNote: true,
      voiceDuration: '0:09',
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg],
    }));

    sounds.playSent();

    const currentChatId = activeContactId;
    setIsTyping(true);
    setContacts((prev) =>
      prev.map((c) => (c.id === currentChatId ? { ...c, status: 'typing...' } : c))
    );

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const personaReply = generateBotResponse(currentChatId, 'voice note received');
      const botMsg: Message = {
        id: `bot-vn-${Date.now()}`,
        senderId: currentChatId,
        senderName: activeContact.name,
        text: `Voice note received loud and clear! 🎧\n\n${personaReply.text}`,
        timestamp: botTime,
        status: 'read',
        isOutgoing: false,
      };

      setMessagesMap((prev) => ({
        ...prev,
        [currentChatId]: [...(prev[currentChatId] || []), botMsg],
      }));

      setContacts((prev) =>
        prev.map((c) =>
          c.id === currentChatId
            ? {
                ...c,
                status: 'online',
                lastMessage: 'Voice message',
                lastMessageTime: botTime,
                lastMessageStatus: 'read',
                lastMessageTimestamp: Date.now(),
              }
            : c
        )
      );

      sounds.playReceived();
      notifications.notify(activeContact.name, botMsg.text);
    }, 900);
  };

  const handleCreatePoll = (question: string, options: string[]) => {
    const attachment: Attachment = {
      type: 'poll',
      pollData: {
        question,
        options: options.map((opt, i) => ({
          id: `opt-${i}`,
          text: opt,
          votes: 0,
          voters: [],
        })),
      },
    };
    handleSendMessage(`📊 Poll: ${question}`, attachment);
  };

  const handleVotePoll = (messageId: string, optionId: string) => {
    setMessagesMap((prev) => {
      const list = prev[activeContactId] || [];
      return {
        ...prev,
        [activeContactId]: list.map((msg) => {
          if (msg.id !== messageId || !msg.attachment?.pollData) return msg;
          const updatedOptions = msg.attachment.pollData.options.map((opt) => {
            if (opt.id === optionId) {
              return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
          });
          return {
            ...msg,
            attachment: {
              ...msg.attachment,
              pollData: {
                ...msg.attachment.pollData,
                options: updatedOptions,
              },
            },
          };
        }),
      };
    });
  };

  const handleReact = (messageId: string, emoji: string) => {
    setMessagesMap((prev) => {
      const list = prev[activeContactId] || [];
      return {
        ...prev,
        [activeContactId]: list.map((msg) => {
          if (msg.id !== messageId) return msg;
          const currentReactions = { ...(msg.reactions || {}) };
          currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;
          return { ...msg, reactions: currentReactions };
        }),
      };
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessagesMap((prev) => ({
      ...prev,
      [activeContactId]: (prev[activeContactId] || []).filter((m) => m.id !== messageId),
    }));
  };

  const handleClearChatHistory = () => {
    setMessagesMap((prev) => ({
      ...prev,
      [activeContactId]: [],
    }));
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContactId
          ? { ...c, lastMessage: '', lastMessageTime: '', lastMessageStatus: undefined }
          : c
      )
    );
  };

  const handleResetAllData = () => {
    storage.clearAllData();
    window.location.reload();
  };

  const handleAddNewContact = (newContact: Contact) => {
    setContacts((prev) => [newContact, ...prev]);
    setActiveContactId(newContact.id);
    setSidebarView('chat-list');
    setMainView('chat');
    setShowMobileChat(true);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
        display: 'flex',
        p: 0,
        m: 0,
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* WhatsApp Web Main Fullscreen Edge-to-Edge Container */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: mode === 'light' ? '#ffffff' : '#111b21',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Left Sidebar (In-Place Pages: Profile, Licenses, Status, Communities, New Chat) */}
        <Box
          sx={{
            width: { xs: '100%', md: 380, lg: 420, xl: 450 },
            display: {
              xs: showMobileChat ? 'none' : 'flex',
              md: 'flex',
            },
            flexDirection: 'column',
            borderRight: 1,
            borderColor: 'divider',
            height: '100%',
            flexShrink: 0,
            bgcolor: mode === 'light' ? '#ffffff' : '#111b21',
            overflow: 'hidden',
          }}
        >
          {sidebarView === 'chat-list' && (
            <>
              <SidebarHeader
                onNavigateSidebar={(view) => setSidebarView(view)}
                onClearChats={handleResetAllData}
              />

              <NotificationBanner />

              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                showUnreadOnly={showUnreadOnly}
                onToggleUnreadOnly={() => setShowUnreadOnly(!showUnreadOnly)}
              />

              <FilterChips
                currentFilter={filterType}
                onSelectFilter={setFilterType}
              />

              <ChatList
                contacts={sortedContacts}
                activeContactId={activeContactId}
                onSelectContact={handleSelectContact}
                messagesMap={messagesMap}
              />
            </>
          )}

          {sidebarView === 'profile' && (
            <ProfilePage onBack={() => setSidebarView('chat-list')} />
          )}

          {sidebarView === 'licenses' && (
            <LicensesPage onBack={() => setSidebarView('chat-list')} />
          )}

          {sidebarView === 'status' && (
            <StatusPage
              onBack={() => setSidebarView('chat-list')}
              onOpenStorySlide={(idx) => {
                setActiveStoryIndex(idx);
                setMainView('story');
              }}
            />
          )}

          {sidebarView === 'communities' && (
            <CommunitiesPage onBack={() => setSidebarView('chat-list')} />
          )}

          {sidebarView === 'new-chat' && (
            <NewChatPage
              onBack={() => setSidebarView('chat-list')}
              contacts={contacts}
              onSelectContact={handleSelectContact}
              onAddNewContact={handleAddNewContact}
            />
          )}
        </Box>

        {/* Right Chat Area (In-Place Views: Chat, Contact Info, Story Slides, Call Screen) */}
        <Box
          sx={{
            flex: 1,
            display: {
              xs: showMobileChat ? 'flex' : 'none',
              md: 'flex',
            },
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            bgcolor: mode === 'light' ? '#efeae2' : '#0b141a',
          }}
        >
          {mainView === 'chat' && (
            <>
              <ChatHeader
                contact={activeContact}
                onBackMobile={() => setShowMobileChat(false)}
                onOpenCall={(isVideo) => {
                  setCallIsVideo(isVideo);
                  setMainView('call');
                }}
                onOpenInfo={() => setMainView('contact-info')}
                onClearChatHistory={handleClearChatHistory}
                inChatSearchQuery={inChatSearchQuery}
                onInChatSearchChange={setInChatSearchQuery}
                showInChatSearch={showInChatSearch}
                onToggleInChatSearch={() => {
                  setShowInChatSearch(!showInChatSearch);
                  setInChatSearchQuery('');
                }}
              />

              <MessageList
                messages={activeMessages}
                isTyping={isTyping}
                onReact={handleReact}
                onDeleteMessage={handleDeleteMessage}
                onReplyMessage={(msg) => setReplyingToMessage(msg)}
                onVotePoll={handleVotePoll}
              />

              <ChatInput
                onSendMessage={handleSendMessage}
                onSendVoiceNote={handleSendVoiceNote}
                replyingToMessage={replyingToMessage}
                onCancelReply={() => setReplyingToMessage(null)}
                onOpenPollDialog={() => setPollDialogOpen(true)}
              />
            </>
          )}

          {mainView === 'contact-info' && (
            <ContactInfoPage
              contact={activeContact}
              onBack={() => setMainView('chat')}
            />
          )}

          {mainView === 'story' && (
            <StorySlideView
              initialIndex={activeStoryIndex}
              onClose={() => setMainView('chat')}
            />
          )}

          {mainView === 'call' && (
            <CallScreenView
              contact={activeContact}
              isVideo={callIsVideo}
              onEndCall={() => setMainView('chat')}
            />
          )}
        </Box>
      </Box>

      {/* Attachment In-Place Poll Dialog */}
      <PollDialog
        open={pollDialogOpen}
        onClose={() => setPollDialogOpen(false)}
        onCreatePoll={handleCreatePoll}
      />
    </Box>
  );
}

export default function Home() {
  return (
    <ThemeRegistry>
      <ChatAppContent />
    </ThemeRegistry>
  );
}
