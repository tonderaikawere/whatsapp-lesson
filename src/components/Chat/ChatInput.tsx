'use client';

import React, { useState } from 'react';
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
import { useColorMode } from '../ThemeRegistry';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendVoiceNote: () => void;
}

export default function ChatInput({ onSendMessage, onSendVoiceNote }: ChatInputProps) {
  const { mode } = useColorMode();
  const [inputText, setInputText] = useState('');
  const [attachAnchorEl, setAttachAnchorEl] = useState<null | HTMLElement>(null);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<null | HTMLElement>(null);

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

  const commonEmojis = [
    '😀', '😂', '😍', '🔥', '👍', '🙏', '🎉', '❤️',
    '✨', '🚀', '💯', '🤔', '😎', '🥳', '🙌', '💡',
    '💻', '📱', '🤖', '🤝', '⭐', '☕', '🎯', '✅',
  ];

  return (
    <Box
      sx={{
        minHeight: 62,
        bgcolor: mode === 'light' ? '#f0f2f5' : '#202c33',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 1, sm: 2 },
        py: 1,
        gap: { xs: 0.5, sm: 1 },
        borderTop: 1,
        borderColor: 'divider',
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
        <Tooltip title="Send Voice Note (Simulated)">
          <IconButton
            size="small"
            onClick={onSendVoiceNote}
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

      {/* Attachment Popover */}
      <Menu
        anchorEl={attachAnchorEl}
        open={Boolean(attachAnchorEl)}
        onClose={() => setAttachAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ paper: {
          sx: {
            mb: 1.5,
            bgcolor: mode === 'light' ? '#ffffff' : '#233138',
            color: mode === 'light' ? '#3b4a54' : '#d1d7db',
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          },
        }}}
      >
        <MenuItem onClick={() => setAttachAnchorEl(null)}>
          <ListItemIcon sx={{ color: '#5f66cd' }}>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Document" />
        </MenuItem>
        <MenuItem onClick={() => setAttachAnchorEl(null)}>
          <ListItemIcon sx={{ color: '#007bfc' }}>
            <CollectionsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Photos & videos" />
        </MenuItem>
        <MenuItem onClick={() => setAttachAnchorEl(null)}>
          <ListItemIcon sx={{ color: '#d3396d' }}>
            <PhotoCameraIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Camera" />
        </MenuItem>
        <MenuItem onClick={() => setAttachAnchorEl(null)}>
          <ListItemIcon sx={{ color: '#0eab61' }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </MenuItem>
        <MenuItem onClick={() => setAttachAnchorEl(null)}>
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
        slotProps={{ paper: {
          sx: {
            p: 1.5,
            mb: 1.5,
            maxWidth: 280,
            bgcolor: mode === 'light' ? '#ffffff' : '#233138',
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          },
        }}}
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
