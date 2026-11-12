'use client';

import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import ThemeRegistry, { useColorMode } from '../components/ThemeRegistry';
import SidebarHeader from '../components/Sidebar/SidebarHeader';
import SearchBar from '../components/Sidebar/SearchBar';
import FilterChips from '../components/Sidebar/FilterChips';
import ChatList from '../components/Sidebar/ChatList';
import ChatHeader from '../components/Chat/ChatHeader';
import MessageList from '../components/Chat/MessageList';
import ChatInput from '../components/Chat/ChatInput';
import DeveloperModal from '../components/Modals/DeveloperModal';
import LicensesModal from '../components/Modals/LicensesModal';
import CallDialog from '../components/Modals/CallDialog';
import ContactInfoDrawer from '../components/Modals/ContactInfoDrawer';
import PollDialog from '../components/Modals/PollDialog';
import StatusViewerModal from '../components/Modals/StatusViewerModal';
import NewChatModal from '../components/Modals/NewChatModal';
import CommunitiesDrawer from '../components/Modals/CommunitiesDrawer';
import { Contact, Message, FilterType, Attachment } from '../types/chat';
import { storage } from '../utils/storage';
import { sounds } from '../utils/sound';
import { generateBotResponse } from '../utils/botResponses';

function ChatAppContent() {
  const { mode } = useColorMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State initialized from local device storage
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeContactId, setActiveContactId] = useState<string>('ai-assistant');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // In-Chat Search & Starred filter
  const [showInChatSearch, setShowInChatSearch] = useState(false);
  const [inChatSearchQuery, setInChatSearchQuery] = useState('');
  const [filterStarred, setFilterStarred] = useState(false);

  // Replying state
  const [replyingToMessage, setReplyingToMessage] = useState<Message | null>(null);

  // Typing status
  const [isTyping, setIsTyping] = useState(false);

  // Mobile navigation state
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Modals state
  const [developerModalOpen, setDeveloperModalOpen] = useState(false);
  const [licensesModalOpen, setLicensesModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callIsVideo, setCallIsVideo] = useState(false);
  const [contactInfoDrawerOpen, setContactInfoDrawerOpen] = useState(false);
  const [pollDialogOpen, setPollDialogOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [communitiesDrawerOpen, setCommunitiesDrawerOpen] = useState(false);

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

  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0] || {
    id: 'ai-assistant',
    name: 'WhatsApp AI Assistant',
    avatar: '🤖',
    phone: '',
    about: '',
    status: 'online',
  };

  const rawMessages = messagesMap[activeContactId] || [];

  // Filter messages in current chat (in-chat search or starred filter)
  const activeMessages = rawMessages.filter((m) => {
    if (filterStarred && !m.isStarred) return false;
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
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.lastMessage && c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()));

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

  const handleSelectContact = (contact: Contact) => {
    setActiveContactId(contact.id);
    setShowMobileChat(true);
    setShowInChatSearch(false);
    setInChatSearchQuery('');
    setFilterStarred(false);

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

    // Update contacts list last message
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContactId
          ? {
              ...c,
              lastMessage: attachment ? `📎 ${attachment.type}` : text,
              lastMessageTime: timeStr,
              lastMessageStatus: 'delivered',
            }
          : c
      )
    );

    // Play outgoing sound
    sounds.playSent();

    // Trigger Bot Reply only if chatting with AI Assistant or Tonderai Bot
    if (activeContactId === 'ai-assistant' || activeContactId === 'tonderai-bot') {
      setIsTyping(true);
      setContacts((prev) =>
        prev.map((c) =>
          c.id === activeContactId ? { ...c, status: 'typing...' } : c
        )
      );

      const reply = generateBotResponse(activeContactId, text || attachment?.name || '');
      const delay = reply.delayMs || 800;

      setTimeout(() => {
        setIsTyping(false);

        const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          senderId: activeContactId,
          senderName: activeContact.name,
          text: reply.text,
          timestamp: botTime,
          status: 'read',
          isOutgoing: false,
        };

        setMessagesMap((prev) => {
          const updated = (prev[activeContactId] || []).map((m) =>
            m.isOutgoing ? { ...m, status: 'read' as const } : m
          );
          return {
            ...prev,
            [activeContactId]: [...updated, botMsg],
          };
        });

        // Ensure contact returns to 'online' status immediately!
        setContacts((prev) =>
          prev.map((c) =>
            c.id === activeContactId
              ? {
                  ...c,
                  status: 'online',
                  lastMessage: reply.text.slice(0, 45) + (reply.text.length > 45 ? '...' : ''),
                  lastMessageTime: botTime,
                  lastMessageStatus: 'read',
                }
              : c
          )
        );

        sounds.playReceived();
      }, delay);
    }
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

    if (activeContactId === 'ai-assistant' || activeContactId === 'tonderai-bot') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const botMsg: Message = {
          id: `bot-vn-${Date.now()}`,
          senderId: activeContactId,
          senderName: activeContact.name,
          text: `Voice note received loud and clear! 🎧\n\nTonderai Kawere specializes in clean code across React, Expo, Next.js, and Node.js. Feel free to explore his portfolio at https://tonde-portfolio.vercel.app/!`,
          timestamp: botTime,
          status: 'read',
          isOutgoing: false,
        };

        setMessagesMap((prev) => ({
          ...prev,
          [activeContactId]: [...(prev[activeContactId] || []), botMsg],
        }));

        setContacts((prev) =>
          prev.map((c) =>
            c.id === activeContactId ? { ...c, status: 'online' } : c
          )
        );

        sounds.playReceived();
      }, 900);
    }
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

  const handleToggleStarMessage = (messageId: string) => {
    setMessagesMap((prev) => {
      const list = prev[activeContactId] || [];
      return {
        ...prev,
        [activeContactId]: list.map((msg) =>
          msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
        ),
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
          ? { ...c, lastMessage: 'Messages cleared', lastMessageStatus: undefined }
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
        {/* Left Sidebar */}
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
          }}
        >
          <SidebarHeader
            onOpenProfile={() => setDeveloperModalOpen(true)}
            onOpenLicenses={() => setLicensesModalOpen(true)}
            onClearChats={handleResetAllData}
            onOpenStatus={() => setStatusModalOpen(true)}
            onOpenCommunities={() => setCommunitiesDrawerOpen(true)}
            onOpenNewChat={() => setNewChatModalOpen(true)}
          />

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
            contacts={filteredContacts}
            activeContactId={activeContactId}
            onSelectContact={handleSelectContact}
          />
        </Box>

        {/* Right Chat Area */}
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
          <ChatHeader
            contact={activeContact}
            onBackMobile={() => setShowMobileChat(false)}
            onOpenCall={(isVideo) => {
              setCallIsVideo(isVideo);
              setCallModalOpen(true);
            }}
            onOpenInfo={() => setContactInfoDrawerOpen(true)}
            onClearChatHistory={handleClearChatHistory}
            inChatSearchQuery={inChatSearchQuery}
            onInChatSearchChange={setInChatSearchQuery}
            showInChatSearch={showInChatSearch}
            onToggleInChatSearch={() => {
              setShowInChatSearch(!showInChatSearch);
              setInChatSearchQuery('');
            }}
            filterStarred={filterStarred}
            onToggleFilterStarred={() => setFilterStarred(!filterStarred)}
          />

          <MessageList
            messages={activeMessages}
            isTyping={isTyping}
            onReact={handleReact}
            onDeleteMessage={handleDeleteMessage}
            onReplyMessage={(msg) => setReplyingToMessage(msg)}
            onToggleStarMessage={handleToggleStarMessage}
            onVotePoll={handleVotePoll}
          />

          <ChatInput
            onSendMessage={handleSendMessage}
            onSendVoiceNote={handleSendVoiceNote}
            replyingToMessage={replyingToMessage}
            onCancelReply={() => setReplyingToMessage(null)}
            onOpenPollDialog={() => setPollDialogOpen(true)}
          />
        </Box>
      </Box>

      {/* Modals & Drawers */}
      <DeveloperModal
        open={developerModalOpen}
        onClose={() => setDeveloperModalOpen(false)}
      />

      <LicensesModal
        open={licensesModalOpen}
        onClose={() => setLicensesModalOpen(false)}
      />

      <CallDialog
        open={callModalOpen}
        isVideo={callIsVideo}
        contact={activeContact}
        onClose={() => setCallModalOpen(false)}
      />

      <ContactInfoDrawer
        open={contactInfoDrawerOpen}
        contact={activeContact}
        onClose={() => setContactInfoDrawerOpen(false)}
      />

      <PollDialog
        open={pollDialogOpen}
        onClose={() => setPollDialogOpen(false)}
        onCreatePoll={handleCreatePoll}
      />

      <StatusViewerModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />

      <NewChatModal
        open={newChatModalOpen}
        onClose={() => setNewChatModalOpen(false)}
        onAddNewContact={handleAddNewContact}
      />

      <CommunitiesDrawer
        open={communitiesDrawerOpen}
        onClose={() => setCommunitiesDrawerOpen(false)}
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
