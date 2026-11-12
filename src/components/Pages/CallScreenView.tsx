'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Contact } from '../../types/chat';

interface CallScreenViewProps {
  contact: Contact;
  isVideo: boolean;
  onEndCall: () => void;
}

export default function CallScreenView({ contact, isVideo, onEndCall }: CallScreenViewProps) {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#111b21',
        color: '#e9edef',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 4,
        position: 'relative',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={onEndCall} sx={{ color: '#fff' }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Center Details */}
      <Box sx={{ textAlign: 'center', my: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {contact.name}
        </Typography>
        <Typography variant="body1" sx={{ color: '#00a884', fontWeight: 600, fontSize: '1.2rem', mb: 1 }}>
          {formatTime(duration)}
        </Typography>
        <Typography variant="caption" sx={{ color: '#8696a0', display: 'block', mb: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
          {isVideo ? 'WhatsApp Video Call' : 'WhatsApp Voice Call'}
        </Typography>

        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Avatar
            sx={{
              width: 140,
              height: 140,
              fontSize: '3.5rem',
              bgcolor: '#202c33',
              boxShadow: '0 0 0 12px rgba(0, 168, 132, 0.2)',
            }}
          >
            {contact.avatar}
          </Avatar>
        </Box>
      </Box>

      {/* Control Buttons */}
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 4 }}>
        <IconButton
          onClick={() => setIsMuted(!isMuted)}
          sx={{
            bgcolor: isMuted ? '#ea4335' : '#202c33',
            color: '#ffffff',
            p: 2,
            '&:hover': { bgcolor: isMuted ? '#d93025' : '#2a3942' },
          }}
        >
          {isMuted ? <MicOffIcon fontSize="large" /> : <MicIcon fontSize="large" />}
        </IconButton>

        {isVideo && (
          <IconButton
            onClick={() => setIsVideoOff(!isVideoOff)}
            sx={{
              bgcolor: isVideoOff ? '#ea4335' : '#202c33',
              color: '#ffffff',
              p: 2,
              '&:hover': { bgcolor: isVideoOff ? '#d93025' : '#2a3942' },
            }}
          >
            {isVideoOff ? <VideocamOffIcon fontSize="large" /> : <VideocamIcon fontSize="large" />}
          </IconButton>
        )}

        <IconButton
          sx={{
            bgcolor: '#202c33',
            color: '#ffffff',
            p: 2,
            '&:hover': { bgcolor: '#2a3942' },
          }}
        >
          <VolumeUpIcon fontSize="large" />
        </IconButton>

        <IconButton
          onClick={onEndCall}
          sx={{
            bgcolor: '#ea4335',
            color: '#ffffff',
            p: 2,
            '&:hover': { bgcolor: '#d93025' },
          }}
        >
          <CallEndIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
