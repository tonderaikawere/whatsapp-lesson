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
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { useColorMode } from '../ThemeRegistry';

interface StatusPageProps {
  onBack: () => void;
  onOpenStorySlide: (storyIndex: number) => void;
}

export default function StatusPage({ onBack, onOpenStorySlide }: StatusPageProps) {
  const { mode } = useColorMode();

  const statuses = [
    {
      name: 'Tonderai Kawere',
      time: 'Today at 14:20',
      avatar: '👨‍💻',
      text: 'Building Cross-Platform Apps with Expo & Next.js 🚀',
      ringColor: '#00a884',
    },
    {
      name: 'Sarah Jenkins',
      time: 'Today at 11:45',
      avatar: '👩‍🎨',
      text: 'Design Systems in Figma 🎨',
      ringColor: '#00a884',
    },
    {
      name: 'Next.js & MUI Devs',
      time: 'Today at 09:10',
      avatar: '⚛️',
      text: 'Turbopack is blazing fast ⚡',
      ringColor: '#00a884',
    },
  ];

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
          Status
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {/* My Status */}
        <List disablePadding>
          <ListItem
            sx={{
              py: 2,
              px: 2.5,
              bgcolor: mode === 'light' ? '#ffffff' : '#111b21',
              cursor: 'pointer',
              '&:hover': { bgcolor: mode === 'light' ? '#f5f6f6' : '#202c33' },
            }}
            onClick={() => onOpenStorySlide(0)}
          >
            <ListItemAvatar>
              <Box sx={{ position: 'relative' }}>
                <Avatar sx={{ bgcolor: '#008069', color: '#fff', width: 48, height: 48, fontWeight: 700 }}>
                  TK
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: '#00a884',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: mode === 'light' ? '#ffffff' : '#111b21',
                  }}
                >
                  <AddIcon sx={{ fontSize: 13 }} />
                </Box>
              </Box>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>My Status</Typography>}
              secondary={<Typography variant="caption" sx={{ color: 'text.secondary' }}>Click to view or add update</Typography>}
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 1 }} />

        <Typography variant="caption" sx={{ px: 2.5, py: 1, color: '#00a884', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>
          Recent Updates
        </Typography>

        <List disablePadding>
          {statuses.map((s, idx) => (
            <ListItem
              key={s.name}
              onClick={() => onOpenStorySlide(idx)}
              sx={{
                py: 1.5,
                px: 2.5,
                cursor: 'pointer',
                bgcolor: mode === 'light' ? '#ffffff' : '#111b21',
                mb: 0.5,
                '&:hover': { bgcolor: mode === 'light' ? '#f5f6f6' : '#202c33' },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: mode === 'light' ? '#e9edef' : '#222e35',
                    fontSize: '1.4rem',
                    border: '3px solid',
                    borderColor: s.ringColor,
                    p: 0.2,
                  }}
                >
                  {s.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{s.name}</Typography>}
                secondary={
                  <>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                      {s.time}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {s.text}
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
