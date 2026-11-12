'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useColorMode } from '../ThemeRegistry';
import { Contact } from '../../types/chat';

interface NewChatPageProps {
  onBack: () => void;
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  onAddNewContact: (newContact: Contact) => void;
}

export default function NewChatPage({
  onBack,
  contacts,
  onSelectContact,
  onAddNewContact,
}: NewChatPageProps) {
  const { mode } = useColorMode();
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateContact = () => {
    if (!name.trim()) return;
    const newC: Contact = {
      id: `contact-${Date.now()}`,
      name: name.trim(),
      avatar: '👤',
      phone: phone.trim() || '+1 (555) 000-0000',
      about: about.trim() || 'Hey there! I am using WhatsApp.',
      status: 'online',
      unreadCount: 0,
      lastMessage: '',
      lastMessageTime: '',
    };
    onAddNewContact(newC);
    setName('');
    setPhone('');
    setAbout('');
    setShowAddForm(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21' }}>
      {/* WhatsApp Web Green Header */}
      <Box
        sx={{
          height: 108,
          bgcolor: mode === 'light' ? '#008069' : '#202c33',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'flex-end',
          p: 2.5,
          gap: 3,
          flexShrink: 0,
        }}
      >
        <IconButton onClick={onBack} sx={{ color: '#ffffff', p: 0.5, mb: 0.2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.2rem', lineHeight: 1 }}>
          New chat
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ p: 1.5, bgcolor: mode === 'light' ? '#ffffff' : '#111b21', borderBottom: 1, borderColor: 'divider' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: mode === 'light' ? '#f0f2f5' : '#202c33',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
          }}
        >
          <SearchIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase
            placeholder="Search name or number..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ fontSize: '0.875rem', color: mode === 'light' ? '#111b21' : '#e9edef' }}
          />
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {/* Actions */}
        <List disablePadding>
          <ListItemButton sx={{ py: 1.5, px: 2.5, bgcolor: mode === 'light' ? '#ffffff' : '#111b21', borderBottom: 1, borderColor: 'divider' }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#00a884', color: '#fff' }}>
                <GroupAddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>New group</Typography>} />
          </ListItemButton>

          <ListItemButton sx={{ py: 1.5, px: 2.5, bgcolor: mode === 'light' ? '#ffffff' : '#111b21', borderBottom: 1, borderColor: 'divider' }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#00a884', color: '#fff' }}>
                <GroupsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>New community</Typography>} />
          </ListItemButton>

          <ListItemButton
            onClick={() => setShowAddForm(!showAddForm)}
            sx={{ py: 1.5, px: 2.5, bgcolor: mode === 'light' ? '#ffffff' : '#111b21', borderBottom: 1, borderColor: 'divider' }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#00a884', color: '#fff' }}>
                <PersonAddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>New contact</Typography>}
              secondary={<Typography variant="caption" sx={{ color: 'text.secondary' }}>Click to create contact in device storage</Typography>}
            />
          </ListItemButton>
        </List>

        {/* Add Contact Inline Form */}
        {showAddForm && (
          <Box sx={{ p: 2.5, bgcolor: mode === 'light' ? '#f9fbf9' : '#182229', borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#00a884' }}>
              Add Contact to Device Roster
            </Typography>
            <TextField
              size="small"
              label="Contact Name"
              placeholder="e.g. Tendai Moyo"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              size="small"
              label="Phone Number"
              placeholder="e.g. +263 77 987 6543"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              size="small"
              label="About"
              placeholder="e.g. Frontend Engineer"
              fullWidth
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 0.5 }}>
              <Button size="small" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleCreateContact}
                disabled={!name.trim()}
                sx={{ bgcolor: '#00a884', '&:hover': { bgcolor: '#008f6f' } }}
              >
                Save Contact
              </Button>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 1 }} />

        <Typography variant="caption" sx={{ px: 2.5, py: 1, color: '#00a884', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>
          Contacts on WhatsApp
        </Typography>

        <List disablePadding>
          {filtered.map((c) => (
            <ListItemButton
              key={c.id}
              onClick={() => {
                onSelectContact(c);
                onBack();
              }}
              sx={{
                py: 1.5,
                px: 2.5,
                bgcolor: mode === 'light' ? '#ffffff' : '#111b21',
                borderBottom: 1,
                borderColor: 'divider',
                '&:hover': { bgcolor: mode === 'light' ? '#f5f6f6' : '#202c33' },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: mode === 'light' ? '#e9edef' : '#222e35', fontSize: '1.4rem' }}>
                  {c.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{c.name}</Typography>}
                secondary={<Typography variant="caption" sx={{ color: 'text.secondary' }}>{c.about}</Typography>}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}
