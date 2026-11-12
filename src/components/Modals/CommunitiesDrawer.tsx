'use client';

import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';
import { useColorMode } from '../ThemeRegistry';

interface CommunitiesDrawerProps {
  open: boolean;
  onClose: () => void;
}

const mockCommunities = [
  {
    id: 'c1',
    name: 'Full-Stack Developers Worldwide',
    avatar: '🌐',
    desc: 'Community for Next.js, React, Node.js, and Cloud architects.',
    members: '12.4k members',
  },
  {
    id: 'c2',
    name: 'Zimbabwe Tech Hub',
    avatar: '🇿🇼',
    desc: 'Innovators, developers, and founders across Bulawayo and Harare.',
    members: '4.8k members',
  },
  {
    id: 'c3',
    name: 'Expo & Mobile Creators',
    avatar: '📱',
    desc: 'Cross-platform app developers building unified iOS & Android experiences.',
    members: '8.1k members',
  },
];

export default function CommunitiesDrawer({ open, onClose }: CommunitiesDrawerProps) {
  const { mode } = useColorMode();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 380, md: 420 },
            bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
            color: mode === 'light' ? '#111b21' : '#e9edef',
          },
        },
      }}
    >
      <Box
        sx={{
          height: 60,
          bgcolor: mode === 'light' ? '#008069' : '#202c33',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 2,
        }}
      >
        <IconButton onClick={onClose} sx={{ color: '#ffffff' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
          Communities
        </Typography>
      </Box>

      <Box sx={{ p: 2, overflowY: 'auto' }}>
        <Box
          sx={{
            bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
            p: 2.5,
            borderRadius: 2,
            textAlign: 'center',
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: mode === 'light' ? '#e7fce3' : '#0a332c',
              color: '#00a884',
              mx: 'auto',
              mb: 1.5,
            }}
          >
            <GroupsIcon fontSize="large" />
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Stay connected with a community
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, mb: 2 }}>
            Communities bring members together in topic-based groups, and make it easy to get admin announcements.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#00a884',
              '&:hover': { bgcolor: '#008f6f' },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Start your community
          </Button>
        </Box>

        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, px: 1, textTransform: 'uppercase' }}>
          Your Communities
        </Typography>

        <List disablePadding sx={{ mt: 1 }}>
          {mockCommunities.map((c) => (
            <ListItem
              key={c.id}
              sx={{
                bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
                borderRadius: 2,
                mb: 1,
                py: 1.5,
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21', fontSize: '1.4rem' }}>
                  {c.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{c.name}</Typography>}
                secondary={
                  <>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                      {c.desc}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#00a884', fontWeight: 600 }}>
                      {c.members}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
