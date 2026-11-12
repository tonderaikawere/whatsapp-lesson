'use client';

import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
  InputBase,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Contact } from '../../types/chat';
import { useColorMode } from '../ThemeRegistry';

interface ChatHeaderProps {
  contact: Contact;
  onBackMobile: () => void;
  onOpenCall: (isVideo: boolean) => void;
  onOpenInfo: () => void;
  onClearChatHistory: () => void;
  inChatSearchQuery: string;
  onInChatSearchChange: (query: string) => void;
  showInChatSearch: boolean;
  onToggleInChatSearch: () => void;
}

export default function ChatHeader({
  contact,
  onBackMobile,
  onOpenCall,
  onOpenInfo,
  onClearChatHistory,
  inChatSearchQuery,
  onInChatSearchChange,
  showInChatSearch,
  onToggleInChatSearch,
}: ChatHeaderProps) {
  const { mode } = useColorMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        height: 60,
        bgcolor: mode === 'light' ? '#f0f2f5' : '#202c33',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 1, sm: 2 },
        borderBottom: 1,
        borderColor: 'divider',
        flexShrink: 0,
        width: '100%',
      }}
    >
      {showInChatSearch ? (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
          <SearchIcon sx={{ color: 'text.secondary' }} />
          <InputBase
            placeholder="Search messages in this chat..."
            fullWidth
            autoFocus
            value={inChatSearchQuery}
            onChange={(e) => onInChatSearchChange(e.target.value)}
            sx={{
              color: mode === 'light' ? '#111b21' : '#e9edef',
              fontSize: '0.9rem',
            }}
          />
          <IconButton size="small" onClick={onToggleInChatSearch}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, overflow: 'hidden' }}>
            <IconButton
              onClick={onBackMobile}
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                color: mode === 'light' ? '#54656f' : '#aebac1',
                p: 0.5,
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Avatar
              onClick={onOpenInfo}
              sx={{
                width: 40,
                height: 40,
                bgcolor: mode === 'light' ? '#e9edef' : '#222e35',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
            >
              {contact.avatar}
            </Avatar>

            <Box sx={{ cursor: 'pointer', minWidth: 0 }} onClick={onOpenInfo}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: mode === 'light' ? '#111b21' : '#e9edef',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {contact.name}
                </Typography>
                {contact.isVerified && (
                  <VerifiedIcon sx={{ fontSize: 16, color: '#00a884' }} />
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: contact.status.includes('typing')
                    ? '#25d366'
                    : mode === 'light'
                    ? '#667781'
                    : '#8696a0',
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: contact.status.includes('typing') ? 600 : 400,
                }}
              >
                {contact.status}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.2, sm: 0.5 } }}>
            <Chip
              icon={<LaunchIcon sx={{ fontSize: '13px !important' }} />}
              label="Tonderai Portfolio"
              component="a"
              href="https://tonde-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              clickable
              size="small"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                bgcolor: mode === 'light' ? '#e7fce3' : '#0a332c',
                color: mode === 'light' ? '#008069' : '#00a884',
                fontWeight: 600,
                fontSize: '0.75rem',
                border: '1px solid',
                borderColor: mode === 'light' ? '#c2f1bc' : '#145247',
              }}
            />

            <Tooltip title="Voice Call">
              <IconButton
                size="small"
                onClick={() => onOpenCall(false)}
                sx={{ color: mode === 'light' ? '#54656f' : '#aebac1' }}
              >
                <CallIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Video Call">
              <IconButton
                size="small"
                onClick={() => onOpenCall(true)}
                sx={{ color: mode === 'light' ? '#54656f' : '#aebac1' }}
              >
                <VideocamIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Search in chat">
              <IconButton
                size="small"
                onClick={onToggleInChatSearch}
                sx={{ color: mode === 'light' ? '#54656f' : '#aebac1' }}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Chat Options">
              <IconButton
                size="small"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ color: mode === 'light' ? '#54656f' : '#aebac1' }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    bgcolor: mode === 'light' ? '#ffffff' : '#233138',
                    color: mode === 'light' ? '#3b4a54' : '#d1d7db',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    minWidth: 180,
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  onOpenInfo();
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <InfoOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Contact Info" />
              </MenuItem>

              <MenuItem
                component="a"
                href="https://tonde-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <LaunchIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Developer Portfolio" />
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  onClearChatHistory();
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Clear Messages" />
              </MenuItem>
            </Menu>
          </Box>
        </>
      )}
    </Box>
  );
}
