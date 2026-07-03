'use client';

import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BlockIcon from '@mui/icons-material/Block';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Contact } from '../../types/chat';
import { useColorMode } from '../ThemeRegistry';

interface ContactInfoDrawerProps {
  open: boolean;
  contact: Contact;
  onClose: () => void;
}

export default function ContactInfoDrawer({ open, contact, onClose }: ContactInfoDrawerProps) {
  const { mode } = useColorMode();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: {
        sx: {
          width: { xs: '100%', sm: 380 },
          bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
          color: mode === 'light' ? '#111b21' : '#e9edef',
        },
      }}}
    >
      {/* Header */}
      <Box
        sx={{
          height: 60,
          bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Contact Info
        </Typography>
      </Box>

      {/* Main details */}
      <Box sx={{ overflowY: 'auto', p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
            p: 3,
            borderRadius: 2,
            mb: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              fontSize: '3rem',
              bgcolor: mode === 'light' ? '#e9edef' : '#222e35',
              mb: 2,
            }}
          >
            {contact.avatar}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {contact.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {contact.phone}
          </Typography>
        </Box>

        {/* Developer link if developer bot */}
        {contact.id === 'tonderai-bot' && (
          <Box
            sx={{
              bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
              p: 2,
              borderRadius: 2,
              mb: 1.5,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#00a884' }}>
              Official Portfolio Website
            </Typography>
            <Button
              fullWidth
              variant="contained"
              endIcon={<LaunchIcon />}
              href="https://tonde-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: mode === 'light' ? '#008069' : '#00a884',
                '&:hover': { bgcolor: mode === 'light' ? '#006d59' : '#009071' },
              }}
            >
              tonde-portfolio.vercel.app
            </Button>
          </Box>
        )}

        {/* About section */}
        <Box
          sx={{
            bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
            p: 2,
            borderRadius: 2,
            mb: 1.5,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            About
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.4 }}>
            {contact.about}
          </Typography>
        </Box>

        {/* Settings / Privacy items */}
        <Box
          sx={{
            bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
            p: 2,
            borderRadius: 2,
            mb: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
            <NotificationsNoneIcon sx={{ color: 'text.secondary' }} />
            <Typography variant="body2">Mute notifications</Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
            <LockIcon sx={{ color: 'text.secondary' }} />
            <Box>
              <Typography variant="body2">Encryption</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                Messages and calls are end-to-end encrypted.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Report / Block */}
        <Box
          sx={{
            bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, color: '#f15c6d', cursor: 'pointer' }}>
            <BlockIcon />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Block {contact.name}
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, color: '#f15c6d', cursor: 'pointer' }}>
            <ThumbDownAltOutlinedIcon />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Report {contact.name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
