'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { notifications } from '../../utils/notifications';
import { useColorMode } from '../ThemeRegistry';

export default function NotificationBanner() {
  const { mode } = useColorMode();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (notifications.isSupported() && notifications.getPermission() === 'default') {
      const dismissed = localStorage.getItem('wa_notif_banner_dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleEnable = async () => {
    const res = await notifications.requestPermission();
    if (res === 'granted') {
      setShowBanner(false);
      notifications.notify('WhatsApp Web', 'Desktop notifications enabled!');
    } else {
      setShowBanner(false);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBanner(false);
    localStorage.setItem('wa_notif_banner_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <Box
      onClick={handleEnable}
      sx={{
        bgcolor: mode === 'light' ? '#53bdeb' : '#182229',
        color: '#ffffff',
        px: 2,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        borderBottom: 1,
        borderColor: 'divider',
        transition: 'background-color 0.15s ease',
        '&:hover': {
          bgcolor: mode === 'light' ? '#47abdb' : '#202c33',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <NotificationsOffOutlinedIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.2 }}>
            Get notified of new messages
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.75rem',
              mt: 0.3,
            }}
          >
            Turn on desktop notifications <ArrowForwardIosIcon sx={{ fontSize: 9 }} />
          </Typography>
        </Box>
      </Box>

      <IconButton size="small" onClick={handleDismiss} sx={{ color: '#ffffff', p: 0.5 }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
