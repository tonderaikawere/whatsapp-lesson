'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockIcon from '@mui/icons-material/Lock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { Message } from '../../types/chat';
import { useColorMode } from '../ThemeRegistry';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onReact: (messageId: string, emoji: string) => void;
  onDeleteMessage: (messageId: string) => void;
}

export default function MessageList({
  messages,
  isTyping,
  onReact,
  onDeleteMessage,
}: MessageListProps) {
  const { mode } = useColorMode();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [activeMenuMsg, setActiveMenuMsg] = useState<Message | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const [reactionMsgId, setReactionMsgId] = useState<string | null>(null);
  const [reactionAnchorEl, setReactionAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickReactions = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: { xs: 1.5, sm: 2.5 },
        display: 'flex',
        flexDirection: 'column',
        gap: 0.8,
        position: 'relative',
        bgcolor: mode === 'light' ? '#efeae2' : '#0b141a',
        backgroundImage:
          mode === 'light'
            ? 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* End-to-End Encryption Banner */}
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
        <Box
          sx={{
            bgcolor: mode === 'light' ? '#ffeecd' : '#182229',
            color: mode === 'light' ? '#54656f' : '#8696a0',
            borderRadius: 2,
            px: 2,
            py: 0.8,
            maxWidth: 480,
            textAlign: 'center',
            boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <LockIcon sx={{ fontSize: 13, color: '#f5a623' }} />
          <Typography variant="caption" sx={{ fontSize: '0.72rem', lineHeight: 1.4 }}>
            🔒 Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
          </Typography>
        </Box>
      </Box>

      {/* Date Divider */}
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 0.5 }}>
        <Box
          sx={{
            bgcolor: mode === 'light' ? '#ffffff' : '#182229',
            color: mode === 'light' ? '#54656f' : '#8696a0',
            borderRadius: 1.5,
            px: 1.5,
            py: 0.4,
            boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
          }}
        >
          <Typography variant="caption" sx={{ fontSize: '0.72rem', fontWeight: 600 }}>
            TODAY
          </Typography>
        </Box>
      </Box>

      {/* Messages */}
      {messages.map((msg) => {
        const isOut = msg.isOutgoing;

        return (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: isOut ? 'flex-end' : 'flex-start',
              position: 'relative',
              '&:hover .msg-actions': { opacity: 1 },
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: '85%', sm: '70%', md: '60%' },
                bgcolor: isOut
                  ? mode === 'light'
                    ? '#d9fdd3'
                    : '#005c4b'
                  : mode === 'light'
                  ? '#ffffff'
                  : '#202c33',
                color: mode === 'light' ? '#111b21' : '#e9edef',
                p: '6px 9px 8px 9px',
                borderRadius: '8px',
                borderTopRightRadius: isOut ? 0 : 8,
                borderTopLeftRadius: !isOut ? 0 : 8,
                boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
                position: 'relative',
                wordBreak: 'break-word',
              }}
            >
              {/* Message Sender name if in group */}
              {!isOut && msg.senderName && (
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: '#00a884',
                    display: 'block',
                    mb: 0.3,
                    fontSize: '0.78rem',
                  }}
                >
                  {msg.senderName}
                </Typography>
              )}

              {/* Voice Note Simulation */}
              {msg.isVoiceNote ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 200, my: 0.5 }}>
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: '#00a884',
                      color: '#ffffff',
                      '&:hover': { bgcolor: '#008f6f' },
                    }}
                  >
                    <PlayArrowIcon fontSize="small" />
                  </IconButton>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        height: 4,
                        bgcolor: mode === 'light' ? '#d1d7db' : '#39464e',
                        borderRadius: 2,
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          width: '45%',
                          height: '100%',
                          bgcolor: '#00a884',
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                      {msg.voiceDuration || '0:14'}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                /* Regular Text */
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.9rem',
                    lineHeight: 1.4,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.text}
                </Typography>
              )}

              {/* Bottom line: Timestamp & Ticks */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 0.4,
                  mt: 0.3,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.68rem',
                    color: mode === 'light' ? '#667781' : '#8696a0',
                  }}
                >
                  {msg.timestamp}
                </Typography>

                {isOut && (
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    {msg.status === 'read' ? (
                      <DoneAllIcon sx={{ fontSize: 14, color: '#53bdeb' }} />
                    ) : msg.status === 'delivered' ? (
                      <DoneAllIcon sx={{ fontSize: 14, color: '#8696a0' }} />
                    ) : msg.status === 'sent' ? (
                      <DoneIcon sx={{ fontSize: 14, color: '#8696a0' }} />
                    ) : (
                      <AccessTimeIcon sx={{ fontSize: 12, color: '#8696a0' }} />
                    )}
                  </Box>
                )}
              </Box>

              {/* Reactions list */}
              {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -10,
                    right: isOut ? 'auto' : 8,
                    left: isOut ? 8 : 'auto',
                    bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    px: 0.6,
                    py: 0.1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.3,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    fontSize: '0.75rem',
                  }}
                >
                  {Object.entries(msg.reactions).map(([emoji, count]) => (
                    <span key={emoji}>
                      {emoji} {count > 1 ? count : ''}
                    </span>
                  ))}
                </Box>
              )}

              {/* Hover message action icons */}
              <Box
                className="msg-actions"
                sx={{
                  position: 'absolute',
                  top: 2,
                  right: isOut ? 'auto' : -60,
                  left: isOut ? -60 : 'auto',
                  display: 'flex',
                  gap: 0.2,
                  opacity: 0,
                  transition: 'opacity 0.15s ease',
                  bgcolor: mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(32,44,51,0.85)',
                  borderRadius: 2,
                  px: 0.3,
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Tooltip title="React">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      setReactionMsgId(msg.id);
                      setReactionAnchorEl(e.currentTarget);
                    }}
                    sx={{ p: 0.3, color: 'text.secondary' }}
                  >
                    <AddReactionOutlinedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Options">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      setActiveMenuMsg(msg);
                      setMenuAnchorEl(e.currentTarget);
                    }}
                    sx={{ p: 0.3, color: 'text.secondary' }}
                  >
                    <MoreVertIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        );
      })}

      {/* Typing indicator bubble */}
      {isTyping && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 0.5 }}>
          <Box
            sx={{
              bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
              borderRadius: 3,
              p: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 0.6,
              boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                bgcolor: '#00a884',
                borderRadius: '50%',
                animation: 'bounce 1.4s infinite ease-in-out',
                '@keyframes bounce': {
                  '0%, 80%, 100%': { transform: 'scale(0)' },
                  '40%': { transform: 'scale(1.0)' },
                },
              }}
            />
            <Box
              sx={{
                width: 7,
                height: 7,
                bgcolor: '#00a884',
                borderRadius: '50%',
                animation: 'bounce 1.4s infinite ease-in-out',
                animationDelay: '0.2s',
              }}
            />
            <Box
              sx={{
                width: 7,
                height: 7,
                bgcolor: '#00a884',
                borderRadius: '50%',
                animation: 'bounce 1.4s infinite ease-in-out',
                animationDelay: '0.4s',
              }}
            />
          </Box>
        </Box>
      )}

      {/* Reaction Popover */}
      <Menu
        anchorEl={reactionAnchorEl}
        open={Boolean(reactionAnchorEl)}
        onClose={() => setReactionAnchorEl(null)}
        slotProps={{ paper: {
          sx: {
            p: 0.5,
            bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
            borderRadius: 4,
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
          },
        }}}
      >
        <Box sx={{ display: 'flex', gap: 0.5, px: 0.5 }}>
          {quickReactions.map((emoji) => (
            <IconButton
              key={emoji}
              size="small"
              onClick={() => {
                if (reactionMsgId) {
                  onReact(reactionMsgId, emoji);
                }
                setReactionAnchorEl(null);
              }}
              sx={{
                fontSize: '1.25rem',
                p: 0.6,
                transition: 'transform 0.1s',
                '&:hover': { transform: 'scale(1.25)' },
              }}
            >
              {emoji}
            </IconButton>
          ))}
        </Box>
      </Menu>

      {/* Message Context Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
        slotProps={{ paper: {
          sx: {
            bgcolor: mode === 'light' ? '#ffffff' : '#233138',
            color: mode === 'light' ? '#3b4a54' : '#d1d7db',
            minWidth: 150,
          },
        }}}
      >
        <MenuItem
          onClick={() => {
            if (activeMenuMsg) {
              navigator.clipboard?.writeText(activeMenuMsg.text);
            }
            setMenuAnchorEl(null);
          }}
        >
          <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} />
          Copy
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (activeMenuMsg) {
              onDeleteMessage(activeMenuMsg.id);
            }
            setMenuAnchorEl(null);
          }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1, color: '#f15c6d' }} />
          Delete
        </MenuItem>
      </Menu>

      <div ref={bottomRef} />
    </Box>
  );
}
