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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessIcon from '@mui/icons-material/Business';
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
      slotProps={{
        paper: {
          sx: {
            bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
            color: mode === 'light' ? '#111b21' : '#e9edef',
            borderRadius: 3,
            maxHeight: '90vh',
          },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: '#00a884', color: '#fff', fontWeight: 700, width: 48, height: 48 }}>TK</Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Tonderai Kawere
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 13, color: '#00a884' }} /> Bulawayo, Zimbabwe (CAT, UTC+2)
            </Typography>
          </Box>
        </Box>

        <Chip
          label="Open to Opportunities"
          size="small"
          sx={{
            bgcolor: mode === 'light' ? '#e7fce3' : '#0a332c',
            color: mode === 'light' ? '#008069' : '#00a884',
            fontWeight: 700,
            fontSize: '0.75rem',
          }}
        />
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: 'divider', overflowY: 'auto' }}>
        {/* Motto & Bio */}
        <Box sx={{ bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21', p: 2, borderRadius: 2, mb: 2 }}>
          <Typography variant="body2" sx={{ fontStyle: 'italic', fontWeight: 600, color: '#00a884', mb: 0.5 }}>
            &ldquo;I like solving messy problems with clean code.&rdquo;
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
            Tonderai is a Zimbabwe-based full-stack developer with 3+ years of experience building scalable web and mobile applications using React, React Native, Node.js, and modern cloud tools, with a proven track record delivering client solutions across energy, hospitality, e-commerce, and social impact sectors.
          </Typography>
        </Box>

        {/* Links & Channels */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Button
            variant="contained"
            size="small"
            endIcon={<LaunchIcon />}
            href="https://tonde-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ bgcolor: '#00a884', '&:hover': { bgcolor: '#008f6f' }, textTransform: 'none', fontWeight: 600 }}
          >
            Portfolio
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<GitHubIcon />}
            href="https://github.com/tonderaikawere"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#00a884', borderColor: '#00a884', textTransform: 'none', fontWeight: 600 }}
          >
            GitHub (1,072+ contributions)
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<LinkedInIcon />}
            href="https://www.linkedin.com/in/tonderaikawere/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#00a884', borderColor: '#00a884', textTransform: 'none', fontWeight: 600 }}
          >
            LinkedIn
          </Button>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Technical Stack */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Technical Expertise:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
            {[
              'React.js',
              'Next.js',
              'React Native',
              'Expo (Cross-Platform)',
              'TypeScript',
              'Node.js & Express',
              'Python & Django',
              'PostgreSQL',
              'MongoDB',
              'Firebase',
              'AWS Cloud',
              'Flutter & Dart',
            ].map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
                  color: mode === 'light' ? '#111b21' : '#e9edef',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Notable Projects */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Notable Projects:
          </Typography>
          {[
            { name: 'Mweya Green Energy', desc: 'Sustainability platform for green energy solutions' },
            { name: 'Chicken Inn Byo', desc: 'Real-world restaurant ordering system in Zimbabwe' },
            { name: 'Eatwell Restaurant', desc: 'Full-stack hospitality food ordering system' },
            { name: 'Nike Zimbabwe', desc: 'Modern e-commerce concept store' },
            { name: 'Jump Start', desc: 'Mental health awareness movement and community platform' },
            { name: 'White Lions Legacies', desc: 'Cultural heritage and legacy preservation web application' },
          ].map((proj, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, my: 0.6 }}>
              <CheckCircleIcon sx={{ fontSize: 16, color: '#00a884', mt: 0.2 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>{proj.name}:</strong> {proj.desc}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Disclaimer & Educational Notice */}
        <Box sx={{ bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21', p: 1.5, borderRadius: 2 }}>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            ⚠️ <strong>Educational Showcase:</strong> This WhatsApp Web clone was built by Tonderai Kawere to showcase real-time chat application architecture and Next.js / Material UI competencies. It is NOT affiliated with WhatsApp LLC or Meta Platforms.
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
            📌 <strong>Fork Policy:</strong> Only fork for educational purposes.
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
