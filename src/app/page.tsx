'use client';

import React, { useState } from 'react';
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
import { initialContacts, initialMessages } from '../data/mockData';
import { Contact, Message, FilterType } from '../types/chat';
import { sounds } from '../utils/sound';
import { generateBotResponse } from '../utils/botResponses';

function ChatAppContent() {
  const { mode } = useColorMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [activeContactId, setActiveContactId] = useState<string>('ai-assistant');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Mobile navigation state
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Modals state
  const [developerModalOpen, setDeveloperModalOpen] = useState(false);
  const [licensesModalOpen, setLicensesModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callIsVideo, setCallIsVideo] = useState(false);
  const [contactInfoDrawerOpen, setContactInfoDrawerOpen] = useState(false);

  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];
  const activeMessages = messagesMap[activeContactId] || [];

  // Filter contacts
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

    // Mark as read
    if (contact.unreadCount && contact.unreadCount > 0) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, unreadCount: 0 } : c))
      );
    }
  };

  const handleSendMessage = (text: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: timeStr,
      status: 'delivered',
      isOutgoing: true,
    };

    // Update messages
    setMessagesMap((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg],
    }));

    // Update contacts list
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContactId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: timeStr,
              lastMessageStatus: 'delivered',
            }
          : c
      )
    );

    // Play outgoing sound
    sounds.playSent();

    // Trigger Bot Reply
    setIsTyping(true);
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContactId ? { ...c, status: 'typing...' } : c
      )
    );

    const reply = generateBotResponse(activeContactId, text);
    const delay = reply.delayMs || 1000;

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
      voiceDuration: '0:07',
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg],
    }));

    sounds.playSent();

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMsg: Message = {
        id: `bot-vn-${Date.now()}`,
        senderId: activeContactId,
        senderName: activeContact.name,
        text: `Got your voice note! 🎧 Audio received loud and clear. (Educational demo by Tonderai Kawere - https://tonde-portfolio.vercel.app/)`,
        timestamp: botTime,
        status: 'read',
        isOutgoing: false,
      };

      setMessagesMap((prev) => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), botMsg],
      }));

      sounds.playReceived();
    }, 1200);
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
          ? { ...c, lastMessage: 'Messages cleared', lastMessageStatus: undefined }
          : c
      )
    );
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: mode === 'light' ? '#d1d7db' : '#0c1317',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 0, lg: 2 },
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* WhatsApp Web Container */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1600,
          height: '100%',
          maxHeight: { xs: '100%', lg: 'calc(100vh - 38px)' },
          bgcolor: mode === 'light' ? '#ffffff' : '#111b21',
          display: 'flex',
          borderRadius: { xs: 0, lg: 3 },
          overflow: 'hidden',
          boxShadow: { xs: 'none', lg: '0 6px 18px rgba(0,0,0,0.2)' },
          position: 'relative',
        }}
      >
        {/* Left Sidebar */}
        <Box
          sx={{
            width: { xs: '100%', md: 380, lg: 420 },
            display: {
              xs: showMobileChat ? 'none' : 'flex',
              md: 'flex',
            },
            flexDirection: 'column',
            borderRight: 1,
            borderColor: 'divider',
            height: '100%',
            flexShrink: 0,
          }}
        >
          <SidebarHeader
            onOpenProfile={() => setDeveloperModalOpen(true)}
            onOpenLicenses={() => setLicensesModalOpen(true)}
            onClearChats={handleClearChatHistory}
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
            overflow: 'hidden',
            position: 'relative',
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
          />

          <MessageList
            messages={activeMessages}
            isTyping={isTyping}
            onReact={handleReact}
            onDeleteMessage={handleDeleteMessage}
          />

          <ChatInput
            onSendMessage={handleSendMessage}
            onSendVoiceNote={handleSendVoiceNote}
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
