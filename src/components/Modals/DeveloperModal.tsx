'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useColorMode } from '../ThemeRegistry';

interface DeveloperModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DeveloperModal({ open, onClose }: DeveloperModalProps) {
  const { mode } = useColorMode();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: {
        sx: {
          bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
          color: mode === 'light' ? '#111b21' : '#e9edef',
          borderRadius: 3,
        },
      }}}
    >
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ bgcolor: '#00a884', color: '#fff', fontWeight: 700 }}>TK</Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Tonderai Kawere
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Full-Stack Software Engineer & Web Architect
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: 'divider' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#00a884', mb: 0.5 }}>
            🌐 Developer Portfolio:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            endIcon={<LaunchIcon />}
            href="https://tonde-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: mode === 'light' ? '#008069' : '#00a884',
              '&:hover': { bgcolor: mode === 'light' ? '#006d59' : '#009071' },
            }}
          >
            Visit tonde-portfolio.vercel.app
          </Button>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <SchoolIcon sx={{ color: '#00a884' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Educational Showcase Project
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
            This application was created by <strong>Tonderai Kawere</strong> strictly as an educational showcase to demonstrate mastery in building modern reactive real-time web applications, pixel-perfect Material UI design system implementation, and responsive chat layouts with Next.js.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Key Capabilities Demonstrated:
          </Typography>
          {[
            'Pixel-faithful WhatsApp Web UI with dark & light mode themes',
            'Dynamic Next.js 15 App Architecture & Material UI 6 components',
            'Full mobile, tablet, and desktop responsive layout with back navigation',
            'Real-time simulation with context-aware AI chatbot responses',
            'Web Audio API synthesized sound effects without external audio files',
            '10 Included Open-Source License reference guides',
          ].map((item, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, my: 0.5 }}>
              <CheckCircleIcon sx={{ fontSize: 18, color: '#00a884', mt: 0.2 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21', p: 1.5, borderRadius: 2 }}>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            ⚠️ <strong>Legal Disclaimer:</strong> This project is an independent educational tool and portfolio demo. It is not affiliated with, authorized, maintained, or endorsed by WhatsApp LLC or Meta Platforms, Inc.
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
            📌 <strong>Fork Policy:</strong> Only fork for educational and learning purposes.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
