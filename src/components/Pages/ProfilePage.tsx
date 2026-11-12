'use client';

import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useColorMode } from '../ThemeRegistry';

interface ProfilePageProps {
  onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
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
          Profile
        </Typography>
      </Box>

      {/* Profile Content */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {/* Avatar Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              sx={{
                width: 140,
                height: 140,
                bgcolor: mode === 'light' ? '#008069' : '#00a884',
                color: '#ffffff',
                fontSize: '3rem',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              TK
            </Avatar>
            <Box
              sx={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                bgcolor: '#00a884',
                color: '#fff',
                borderRadius: '50%',
                p: 0.8,
                display: 'flex',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            >
              <PhotoCameraIcon fontSize="small" />
            </Box>
          </Box>
        </Box>

        {/* Your Name */}
        <Box sx={{ bgcolor: mode === 'light' ? '#ffffff' : '#202c33', p: 2, borderRadius: 2, mb: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#00a884', fontWeight: 600 }}>
            Your name
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 0.5 }}>
            Tonderai Kawere (Tonde)
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 13, color: '#00a884' }} /> Bulawayo, Zimbabwe (CAT, UTC+2)
          </Typography>
        </Box>

        {/* About & Motto */}
        <Box sx={{ bgcolor: mode === 'light' ? '#ffffff' : '#202c33', p: 2, borderRadius: 2, mb: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#00a884', fontWeight: 600 }}>
            About & Personal Motto
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', fontWeight: 600, mt: 0.5, color: '#00a884' }}>
            &ldquo;I like solving messy problems with clean code.&rdquo;
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, lineHeight: 1.5 }}>
            Full-stack developer with 3+ years of experience building scalable web and mobile applications using React, React Native, Node.js, and modern cloud tools, with a proven track record delivering client solutions across energy, hospitality, e-commerce, and social impact.
          </Typography>
        </Box>

        {/* Portfolio & Connection Links */}
        <Box sx={{ bgcolor: mode === 'light' ? '#ffffff' : '#202c33', p: 2, borderRadius: 2, mb: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#00a884', fontWeight: 600, display: 'block', mb: 1 }}>
            Official Portfolio & Verified Channels
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="contained"
              fullWidth
              endIcon={<LaunchIcon />}
              href="https://tonde-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ bgcolor: '#008069', '&:hover': { bgcolor: '#006d59' }, textTransform: 'none', fontWeight: 600 }}
            >
              Visit tonde-portfolio.vercel.app
            </Button>

            <Button
              variant="outlined"
              fullWidth
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
              fullWidth
              startIcon={<LinkedInIcon />}
              href="https://www.linkedin.com/in/tonderaikawere/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#00a884', borderColor: '#00a884', textTransform: 'none', fontWeight: 600 }}
            >
              LinkedIn Profile
            </Button>
          </Box>
        </Box>

        {/* Skills */}
        <Box sx={{ bgcolor: mode === 'light' ? '#ffffff' : '#202c33', p: 2, borderRadius: 2, mb: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#00a884', fontWeight: 600, display: 'block', mb: 1 }}>
            Technical Expertise
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
            {['React.js', 'Next.js', 'React Native', 'Expo', 'TypeScript', 'Node.js', 'Python / Django', 'Firebase', 'PostgreSQL', 'MongoDB', 'AWS'].map((s) => (
              <Chip key={s} label={s} size="small" sx={{ bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21', fontWeight: 600, fontSize: '0.75rem' }} />
            ))}
          </Box>
        </Box>

        {/* Notable Projects */}
        <Box sx={{ bgcolor: mode === 'light' ? '#ffffff' : '#202c33', p: 2, borderRadius: 2, mb: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#00a884', fontWeight: 600, display: 'block', mb: 1 }}>
            Notable Delivered Projects
          </Typography>
          {[
            { title: 'Mweya Green Energy', text: 'Clean energy solutions website & platform' },
            { title: 'Chicken Inn Byo', text: 'Restaurant ordering system in Bulawayo' },
            { title: 'Eatwell Restaurant', text: 'Full-stack food ordering platform' },
            { title: 'Nike Zimbabwe', text: 'E-commerce concept store' },
            { title: 'Jump Start', text: 'Mental health community awareness movement' },
          ].map((p, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, my: 0.7 }}>
              <CheckCircleIcon sx={{ fontSize: 16, color: '#00a884', mt: 0.2 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>{p.title}:</strong> {p.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
