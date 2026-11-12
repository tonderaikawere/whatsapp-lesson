'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useColorMode } from '../ThemeRegistry';
import { Contact } from '../../types/chat';

interface NewChatModalProps {
  open: boolean;
  onClose: () => void;
  onAddNewContact: (newContact: Contact) => void;
}

export default function NewChatModal({ open, onClose, onAddNewContact }: NewChatModalProps) {
  const { mode } = useColorMode();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');

  const handleCreate = () => {
    if (!name.trim()) return;
    const newContact: Contact = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      avatar: '👤',
      phone: phone.trim() || '+1 (555) 000-0000',
      about: about.trim() || 'Hey there! I am using WhatsApp.',
      status: 'online',
      unreadCount: 0,
      lastMessage: 'Chat started',
      lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onAddNewContact(newContact);
    setName('');
    setPhone('');
    setAbout('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
            color: mode === 'light' ? '#111b21' : '#e9edef',
            borderRadius: 3,
          },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonAddIcon sx={{ color: '#00a884' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            New Chat / Contact
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: 'divider', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Contact Name"
          placeholder="e.g. Jane Doe"
          fullWidth
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              color: mode === 'light' ? '#111b21' : '#e9edef',
              bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
            },
          }}
        />

        <TextField
          label="Phone Number"
          placeholder="e.g. +263 77 123 4567"
          fullWidth
          size="small"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              color: mode === 'light' ? '#111b21' : '#e9edef',
              bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
            },
          }}
        />

        <TextField
          label="About Status"
          placeholder="e.g. Available for code review"
          fullWidth
          size="small"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              color: mode === 'light' ? '#111b21' : '#e9edef',
              bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={!name.trim()}
          sx={{
            bgcolor: '#00a884',
            color: '#fff',
            '&:hover': { bgcolor: '#008f6f' },
          }}
        >
          Start Chat
        </Button>
      </DialogActions>
    </Dialog>
  );
}
