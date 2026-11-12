'use client';

import React, { useState } from 'react';
import {
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsIcon from '@mui/icons-material/Groups';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';
import PolicyIcon from '@mui/icons-material/Policy';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useColorMode } from '../ThemeRegistry';

export type SidebarView = 'chat-list' | 'profile' | 'status' | 'communities' | 'new-chat' | 'licenses';

interface SidebarHeaderProps {
  onNavigateSidebar: (view: SidebarView) => void;
  onClearChats: () => void;
}

export default function SidebarHeader({
  onNavigateSidebar,
  onClearChats,
}: SidebarHeaderProps) {
  const { mode, toggleColorMode } = useColorMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        height: 60,
        bgcolor: mode === 'light' ? '#f0f2f5' : '#202c33',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        borderBottom: 1,
        borderColor: 'divider',
        flexShrink: 0,
      }}
    >
      <Tooltip title="View Profile (Tonderai Kawere)">
        <IconButton onClick={() => onNavigateSidebar('profile')} sx={{ p: 0 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: mode === 'light' ? '#008069' : '#00a884',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            TK
          </Avatar>
        </IconButton>
      </Tooltip>

      <Box sx={{ display: 'flex', gap: 0.5, color: mode === 'light' ? '#54656f' : '#aebac1' }}>
        <Tooltip title="Communities">
          <IconButton size="small" onClick={() => onNavigateSidebar('communities')} sx={{ color: 'inherit' }}>
            <GroupsIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Status (Stories)">
          <IconButton size="small" onClick={() => onNavigateSidebar('status')} sx={{ color: 'inherit' }}>
            <DonutLargeIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="New Chat">
          <IconButton size="small" onClick={() => onNavigateSidebar('new-chat')} sx={{ color: 'inherit' }}>
            <ChatIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} Mode`}>
          <IconButton size="small" onClick={toggleColorMode} sx={{ color: 'inherit' }}>
            {mode === 'light' ? <Brightness4Icon fontSize="small" /> : <Brightness7Icon fontSize="small" />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Menu">
          <IconButton size="small" onClick={handleMenuOpen} sx={{ color: 'inherit' }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                bgcolor: mode === 'light' ? '#ffffff' : '#233138',
                color: mode === 'light' ? '#3b4a54' : '#d1d7db',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: 210,
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onNavigateSidebar('profile');
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Developer Profile" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleMenuClose();
              onNavigateSidebar('licenses');
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <PolicyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="10 Open Licenses" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleMenuClose();
              onClearChats();
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <DeleteSweepIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Reset All Data" />
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
