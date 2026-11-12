'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  LinearProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface StorySlideViewProps {
  initialIndex: number;
  onClose: () => void;
}

const statusStories = [
  {
    id: 's1',
    name: 'Tonderai Kawere',
    avatar: '👨‍💻',
    time: 'Today, 14:20',
    title: 'Building Cross-Platform Apps with Expo & Next.js 🚀',
    body: 'Currently specializing in unified iOS, Android, and Web architectures! Loving how fast we can ship clean solutions with TypeScript and React.\n\n🌐 tonde-portfolio.vercel.app',
    bg: 'linear-gradient(135deg, #005c4b 0%, #00a884 100%)',
  },
  {
    id: 's2',
    name: 'Thandeka Dube',
    avatar: '👩🏾‍🎨',
    time: 'Today, 11:45',
    title: 'Design Systems in Figma 🎨',
    body: 'Working on accessible color palettes and consistent WhatsApp Web design tokens from Bulawayo. Beautiful typography and high contrast make all the difference!',
    bg: 'linear-gradient(135deg, #1d2b64 0%, #f8cdda 100%)',
  },
  {
    id: 's3',
    name: 'Zimbabwe Tech & Devs 🇿🇼',
    avatar: '⚛️',
    time: 'Today, 09:10',
    title: 'Turbopack & Next.js ⚡',
    body: 'Production builds taking under 2 seconds! Full TypeScript validation and zero runtime overhead for developers in Bulawayo and Harare.',
    bg: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
  },
];

export default function StorySlideView({ initialIndex, onClose }: StorySlideViewProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex || 0);
    setProgress(0);
  }, [initialIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < statusStories.length - 1) {
            setCurrentIndex((c) => c + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, onClose]);

  const handleNext = () => {
    if (currentIndex < statusStories.length - 1) {
      setCurrentIndex((c) => c + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((c) => c - 1);
      setProgress(0);
    }
  };

  const current = statusStories[currentIndex];

  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: '#0b141a', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Progress Bars */}
      <Box sx={{ display: 'flex', gap: 0.8, p: 2, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        {statusStories.map((story, idx) => (
          <LinearProgress
            key={story.id}
            variant="determinate"
            value={idx < currentIndex ? 100 : idx === currentIndex ? progress : 0}
            sx={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.25)',
              '& .MuiLinearProgress-bar': { bgcolor: '#ffffff' },
            }}
          />
        ))}
      </Box>

      {/* Top Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          pt: 4,
          pb: 1,
          zIndex: 10,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton onClick={onClose} sx={{ color: '#fff', p: 0.5 }}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar sx={{ width: 44, height: 44, bgcolor: '#202c33', fontSize: '1.4rem' }}>
            {current.avatar}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fff' }}>
              {current.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {current.time}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Story Slide Area */}
      <Box
        sx={{
          flex: 1,
          background: current.bg,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#fff', maxWidth: 600 }}>
          {current.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 520,
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.95)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {current.body}
        </Typography>

        <IconButton
          onClick={handlePrev}
          disabled={currentIndex === 0}
          sx={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.3)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.3)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
