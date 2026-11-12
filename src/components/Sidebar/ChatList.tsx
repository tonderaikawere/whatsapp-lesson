'use client';

import React from 'react';
import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Badge,
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import PushPinIcon from '@mui/icons-material/PushPin';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Contact, Message } from '../../types/chat';
import { useColorMode } from '../ThemeRegistry';

interface ChatListProps {
  contacts: Contact[];
  activeContactId: string;
  onSelectContact: (contact: Contact) => void;
  messagesMap: Record<string, Message[]>;
}

export default function ChatList({
  contacts,
  activeContactId,
  onSelectContact,
  messagesMap,
}: ChatListProps) {
  const { mode } = useColorMode();

  if (contacts.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">No chats found</Typography>
      </Box>
    );
  }

  return (
    <List disablePadding sx={{ overflowY: 'auto', flex: 1 }}>
      {contacts.map((contact) => {
        const isActive = contact.id === activeContactId;

        // Directly derive preview from actual real messages sent/received
        const contactMsgs = messagesMap[contact.id] || [];
        const hasRealMessages = contactMsgs.length > 0;
        const lastMsg = hasRealMessages ? contactMsgs[contactMsgs.length - 1] : null;

        const displayPreview = lastMsg
          ? lastMsg.attachment
            ? `📎 ${lastMsg.attachment.type}`
            : lastMsg.text || 'Attachment'
          : 'No messages here';

        const displayTime = lastMsg ? lastMsg.timestamp : '';
        const displayStatus = lastMsg?.isOutgoing ? lastMsg.status : null;

        return (
          <ListItemButton
            key={contact.id}
            selected={isActive}
            onClick={() => onSelectContact(contact)}
            sx={{
              py: 1.5,
              px: 2,
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: isActive
                ? mode === 'light'
                  ? '#f0f2f5'
                  : '#2a3942'
                : 'transparent',
              '&:hover': {
                bgcolor: mode === 'light' ? '#f5f6f6' : '#202c33',
              },
              '&.Mui-selected': {
                bgcolor: mode === 'light' ? '#f0f2f5' : '#2a3942',
                '&:hover': {
                  bgcolor: mode === 'light' ? '#f0f2f5' : '#2a3942',
                },
              },
            }}
          >
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor:
                      contact.status === 'online' || contact.status?.includes('typing')
                        ? '#25d366'
                        : 'transparent',
                    border: '2px solid',
                    borderColor: mode === 'light' ? '#ffffff' : '#111b21',
                    display:
                      contact.status === 'online' || contact.status?.includes('typing')
                        ? 'block'
                        : 'none',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: mode === 'light' ? '#e9edef' : '#222e35',
                    fontSize: '1.4rem',
                  }}
                >
                  {contact.avatar}
                </Avatar>
              </Badge>
            </ListItemAvatar>

            <ListItemText
              disableTypography
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: mode === 'light' ? '#111b21' : '#e9edef',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 160,
                      }}
                    >
                      {contact.name}
                    </Typography>
                    {contact.isVerified && (
                      <VerifiedIcon sx={{ fontSize: 14, color: '#00a884' }} />
                    )}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        contact.unreadCount && contact.unreadCount > 0
                          ? '#25d366'
                          : mode === 'light'
                          ? '#667781'
                          : '#8696a0',
                      fontSize: '0.75rem',
                      fontWeight: contact.unreadCount && contact.unreadCount > 0 ? 600 : 400,
                    }}
                  >
                    {displayTime}
                  </Typography>
                </Box>
              }
              secondary={
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 0.3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, maxWidth: '80%' }}>
                    {hasRealMessages && displayStatus && (
                      displayStatus === 'read' ? (
                        <DoneAllIcon sx={{ fontSize: 16, color: '#53bdeb' }} />
                      ) : displayStatus === 'delivered' ? (
                        <DoneAllIcon sx={{ fontSize: 16, color: '#8696a0' }} />
                      ) : displayStatus === 'sent' ? (
                        <DoneIcon sx={{ fontSize: 16, color: '#8696a0' }} />
                      ) : null
                    )}

                    <Typography
                      variant="body2"
                      sx={{
                        color: !hasRealMessages
                          ? 'text.disabled'
                          : contact.status?.includes('typing')
                          ? '#25d366'
                          : mode === 'light'
                          ? '#667781'
                          : '#8696a0',
                        fontSize: '0.825rem',
                        fontStyle: !hasRealMessages ? 'italic' : 'normal',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: contact.status?.includes('typing') ? 600 : 400,
                      }}
                    >
                      {contact.status?.includes('typing') ? 'typing...' : displayPreview}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {contact.isPinned && (
                      <PushPinIcon
                        sx={{
                          fontSize: 14,
                          color: mode === 'light' ? '#8696a0' : '#667781',
                          transform: 'rotate(45deg)',
                        }}
                      />
                    )}
                    {Boolean(contact.unreadCount && contact.unreadCount > 0) && (
                      <Box
                        sx={{
                          bgcolor: '#25d366',
                          color: '#ffffff',
                          borderRadius: '50%',
                          minWidth: 18,
                          height: 18,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          px: 0.5,
                        }}
                      >
                        {contact.unreadCount}
                      </Box>
                    )}
                  </Box>
                </Box>
              }
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}
