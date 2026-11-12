'use client';

import React from 'react';
import {
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';
import { useColorMode } from '../ThemeRegistry';

interface CommunitiesPageProps {
  onBack: () => void;
}

const mockCommunities = [
  {
    id: 'c1',
    name: 'Full-Stack Developers Worldwide',
    avatar: '🌐',
    desc: 'Next.js, React, Node.js, and Cloud architects sharing knowledge.',
    members: '12,400 members',
  },
  {
    id: 'c2',
    name: 'Zimbabwe Tech Hub',
    avatar: '🇿🇼',
    desc: 'Innovators, developers, and founders across Bulawayo and Harare.',
    members: '4,850 members',
  },
  {
    id: 'c3',
    name: 'Expo & Mobile Creators',
    avatar: '📱',
    desc: 'Cross-platform app developers building unified iOS & Android experiences.',
    members: '8,120 members',
  },
];

export default function CommunitiesPage({ onBack }: CommunitiesPageProps) {
  const { mode } = useColorMode();

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
          Communities
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <Box
          sx={{
            bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
            p: 3,
            borderRadius: 2,
            textAlign: 'center',
            mb: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
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
              bgcolor: '#008069',
              '&:hover': { bgcolor: '#006d59' },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Start your community
          </Button>
        </Box>

        <Typography variant="caption" sx={{ color: '#00a884', fontWeight: 700, px: 1, textTransform: 'uppercase' }}>
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
                border: '1px solid',
                borderColor: 'divider',
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
    </Box>
  );
}
