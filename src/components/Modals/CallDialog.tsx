'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
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
import { Contact } from '../../types/chat';

interface CallDialogProps {
  open: boolean;
  isVideo: boolean;
  contact: Contact;
  onClose: () => void;
}

export default function CallDialog({ open, isVideo, contact, onClose }: CallDialogProps) {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      setDuration(0);
      timer = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [open]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: {
        sx: {
          bgcolor: '#111b21',
          color: '#e9edef',
          borderRadius: 4,
          overflow: 'hidden',
          minHeight: 440,
        },
      }}}
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 4,
        }}
      >
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            {contact.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#00a884', fontWeight: 600 }}>
            {formatTime(duration)}
          </Typography>
          <Typography variant="caption" sx={{ color: '#8696a0', display: 'block', mt: 0.5 }}>
            {isVideo ? 'WhatsApp Video Call (Simulated)' : 'WhatsApp Voice Call (Simulated)'}
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', my: 3 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: '2.5rem',
              bgcolor: '#202c33',
              boxShadow: '0 0 0 8px rgba(0, 168, 132, 0.2)',
            }}
          >
            {contact.avatar}
          </Avatar>
        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton
            onClick={() => setIsMuted(!isMuted)}
            sx={{
              bgcolor: isMuted ? '#ea4335' : '#202c33',
              color: '#ffffff',
              p: 1.5,
              '&:hover': { bgcolor: isMuted ? '#d93025' : '#2a3942' },
            }}
          >
            {isMuted ? <MicOffIcon /> : <MicIcon />}
          </IconButton>

          {isVideo && (
            <IconButton
              onClick={() => setIsVideoOff(!isVideoOff)}
              sx={{
                bgcolor: isVideoOff ? '#ea4335' : '#202c33',
                color: '#ffffff',
                p: 1.5,
                '&:hover': { bgcolor: isVideoOff ? '#d93025' : '#2a3942' },
              }}
            >
              {isVideoOff ? <VideocamOffIcon /> : <VideocamIcon />}
            </IconButton>
          )}

          <IconButton
            sx={{
              bgcolor: '#202c33',
              color: '#ffffff',
              p: 1.5,
              '&:hover': { bgcolor: '#2a3942' },
            }}
          >
            <VolumeUpIcon />
          </IconButton>

          <IconButton
            onClick={onClose}
            sx={{
              bgcolor: '#ea4335',
              color: '#ffffff',
              p: 1.5,
              '&:hover': { bgcolor: '#d93025' },
            }}
          >
            <CallEndIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
