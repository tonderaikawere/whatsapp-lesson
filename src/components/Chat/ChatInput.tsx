'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  InputBase,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CollectionsIcon from '@mui/icons-material/Collections';
import PersonIcon from '@mui/icons-material/Person';
import PollIcon from '@mui/icons-material/Poll';
import CloseIcon from '@mui/icons-material/Close';
import StopIcon from '@mui/icons-material/Stop';
import { useColorMode } from '../ThemeRegistry';
import { Message, Attachment } from '../../types/chat';

interface ChatInputProps {
  onSendMessage: (text: string, attachment?: Attachment) => void;
  onSendVoiceNote: () => void;
  replyingToMessage: Message | null;
  onCancelReply: () => void;
  onOpenPollDialog: () => void;
}

export default function ChatInput({
  onSendMessage,
  onSendVoiceNote,
  replyingToMessage,
  onCancelReply,
  onOpenPollDialog,
}: ChatInputProps) {
  const { mode } = useColorMode();
  const [inputText, setInputText] = useState('');
  const [attachAnchorEl, setAttachAnchorEl] = useState<null | HTMLElement>(null);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<null | HTMLElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const recordIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Image Upload handler
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const attachment: Attachment = {
        type: 'image',
        url: dataUrl,
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        mimeType: file.type,
      };
      onSendMessage(inputText.trim() || 'Photo', attachment);
      setInputText('');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Document Upload handler
  const handleDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const attachment: Attachment = {
        type: 'document',
        url: dataUrl,
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        mimeType: file.type,
      };
      onSendMessage(inputText.trim(), attachment);
      setInputText('');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Start voice recording simulation
  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordSeconds(0);
    recordIntervalRef.current = setInterval(() => {
      setRecordSeconds((s) => s + 1);
    }, 1000);
  };

  const handleStopAndSendRecording = () => {
    if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    setIsRecording(false);
    onSendVoiceNote();
  };

  const handleCancelRecording = () => {
    if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    setIsRecording(false);
  };

  // Quick share contact
  const handleShareContact = () => {
    setAttachAnchorEl(null);
    const attachment: Attachment = {
      type: 'contact',
      contactData: {
        name: 'Tonderai Kawere',
        phone: '+263 77 000 0000 (tonde-portfolio.vercel.app)',
        avatar: '👨‍💻',
      },
    };
    onSendMessage('Shared contact card', attachment);
  };

  const commonEmojis = [
    '😀', '😂', '😍', '🔥', '👍', '🙏', '🎉', '❤️',
    '✨', '🚀', '💯', '🤔', '😎', '🥳', '🙌', '💡',
    '💻', '📱', '🤖', '🤝', '⭐', '☕', '🎯', '✅',
  ];

  return (
    <Box
      sx={{
        bgcolor: mode === 'light' ? '#f0f2f5' : '#202c33',
        display: 'flex',
        flexDirection: 'column',
        borderTop: 1,
        borderColor: 'divider',
        width: '100%',
        flexShrink: 0,
      }}
    >
      {/* Hidden file inputs for device storage uploads */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageFileChange}
      />
      <input
        type="file"
        ref={docInputRef}
        accept=".pdf,.doc,.docx,.txt,.zip"
        style={{ display: 'none' }}
        onChange={handleDocFileChange}
      />

      {/* Quoted Message Preview bar */}
      {replyingToMessage && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 0.8,
            bgcolor: mode === 'light' ? '#e9edef' : '#182229',
            borderLeft: '4px solid #00a884',
          }}
        >
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#00a884', display: 'block' }}>
              Replying to {replyingToMessage.senderName || 'Message'}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
            >
              {replyingToMessage.text || replyingToMessage.attachment?.name || 'Attachment'}
            </Typography>
          </Box>
          <IconButton size="small" onClick={onCancelReply}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Active Recording State */}
      {isRecording ? (
        <Box
          sx={{
            minHeight: 62,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton size="small" onClick={handleCancelRecording} sx={{ color: '#f15c6d' }}>
              <CloseIcon />
            </IconButton>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: '#f15c6d',
                animation: 'pulse 1s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.3 },
                },
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              0:{recordSeconds.toString().padStart(2, '0')}
            </Typography>
          </Box>

          <IconButton
            onClick={handleStopAndSendRecording}
            sx={{
              bgcolor: '#00a884',
              color: '#fff',
              '&:hover': { bgcolor: '#008f6f' },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      ) : (
        /* Normal Chat Input Row */
        <Box
          sx={{
            minHeight: 62,
            display: 'flex',
            alignItems: 'center',
            px: { xs: 1, sm: 2 },
            py: 1,
            gap: { xs: 0.5, sm: 1 },
            width: '100%',
          }}
        >
          {/* Emoji Toggle Button */}
          <Tooltip title="Emojis">
            <IconButton
              size="small"
              onClick={(e) => setEmojiAnchorEl(e.currentTarget)}
              sx={{ color: mode === 'light' ? '#54656f' : '#8696a0' }}
            >
              <InsertEmoticonIcon />
            </IconButton>
          </Tooltip>

          {/* Attachment Button */}
          <Tooltip title="Attach">
            <IconButton
              size="small"
              onClick={(e) => setAttachAnchorEl(e.currentTarget)}
              sx={{ color: mode === 'light' ? '#54656f' : '#8696a0' }}
            >
              <AttachFileIcon sx={{ transform: 'rotate(45deg)' }} />
            </IconButton>
          </Tooltip>

          {/* Input Box */}
          <Box
            sx={{
              flex: 1,
              bgcolor: mode === 'light' ? '#ffffff' : '#2a3942',
              borderRadius: 2,
              px: 2,
              py: 0.8,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <InputBase
              fullWidth
              multiline
              maxRows={4}
              placeholder="Type a message"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                fontSize: '0.925rem',
                color: mode === 'light' ? '#111b21' : '#d1d7db',
                '& input::placeholder': {
                  color: mode === 'light' ? '#667781' : '#8696a0',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Dynamic Action: Mic or Send Button */}
          {inputText.trim() ? (
            <Tooltip title="Send message">
              <IconButton
                size="small"
                onClick={handleSend}
                sx={{
                  bgcolor: mode === 'light' ? '#008069' : '#00a884',
                  color: '#ffffff',
                  p: 1.1,
                  '&:hover': {
                    bgcolor: mode === 'light' ? '#006d59' : '#009071',
                  },
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Click to record voice note">
              <IconButton
                size="small"
                onClick={handleStartRecording}
                sx={{
                  color: mode === 'light' ? '#54656f' : '#8696a0',
                  p: 1,
                  '&:hover': {
                    color: mode === 'light' ? '#008069' : '#00a884',
                  },
                }}
              >
                <MicIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}

      {/* Attachment Popover */}
      <Menu
        anchorEl={attachAnchorEl}
        open={Boolean(attachAnchorEl)}
        onClose={() => setAttachAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              mb: 1.5,
              bgcolor: mode === 'light' ? '#ffffff' : '#233138',
              color: mode === 'light' ? '#3b4a54' : '#d1d7db',
              borderRadius: 3,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setAttachAnchorEl(null);
            docInputRef.current?.click();
          }}
        >
          <ListItemIcon sx={{ color: '#5f66cd' }}>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Document (PDF, Word, etc.)" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAttachAnchorEl(null);
            fileInputRef.current?.click();
          }}
        >
          <ListItemIcon sx={{ color: '#007bfc' }}>
            <CollectionsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Photos & videos" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAttachAnchorEl(null);
            fileInputRef.current?.click();
          }}
        >
          <ListItemIcon sx={{ color: '#d3396d' }}>
            <PhotoCameraIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Camera / Image" />
        </MenuItem>

        <MenuItem onClick={handleShareContact}>
          <ListItemIcon sx={{ color: '#0eab61' }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Contact (Tonderai Kawere)" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAttachAnchorEl(null);
            onOpenPollDialog();
          }}
        >
          <ListItemIcon sx={{ color: '#ffbc38' }}>
            <PollIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Poll" />
        </MenuItem>
      </Menu>

      {/* Emojis Popover */}
      <Popover
        anchorEl={emojiAnchorEl}
        open={Boolean(emojiAnchorEl)}
        onClose={() => setEmojiAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              p: 1.5,
              mb: 1.5,
              maxWidth: 290,
              bgcolor: mode === 'light' ? '#ffffff' : '#233138',
              borderRadius: 3,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            },
          },
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0.5 }}>
          {commonEmojis.map((emoji) => (
            <IconButton
              key={emoji}
              size="small"
              onClick={() => {
                setInputText((prev) => prev + emoji);
                setEmojiAnchorEl(null);
              }}
              sx={{ fontSize: '1.25rem' }}
            >
              {emoji}
            </IconButton>
          ))}
        </Box>
      </Popover>
    </Box>
  );
}
