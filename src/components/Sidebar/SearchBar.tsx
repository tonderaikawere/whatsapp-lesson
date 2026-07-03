'use client';

import React from 'react';
import { Box, InputBase, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { useColorMode } from '../ThemeRegistry';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showUnreadOnly: boolean;
  onToggleUnreadOnly: () => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  showUnreadOnly,
  onToggleUnreadOnly,
}: SearchBarProps) {
  const { mode } = useColorMode();

  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: mode === 'light' ? '#ffffff' : '#111b21',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          bgcolor: mode === 'light' ? '#f0f2f5' : '#202c33',
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
        }}
      >
        <SearchIcon
          fontSize="small"
          sx={{ color: mode === 'light' ? '#54656f' : '#8696a0', mr: 1 }}
        />
        <InputBase
          placeholder="Search or start new chat"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            flex: 1,
            fontSize: '0.875rem',
            color: mode === 'light' ? '#111b21' : '#d1d7db',
            '& input::placeholder': {
              color: mode === 'light' ? '#667781' : '#8696a0',
              opacity: 1,
            },
          }}
        />
        {searchQuery && (
          <IconButton size="small" onClick={() => onSearchChange('')} sx={{ p: 0.2 }}>
            <ClearIcon fontSize="small" sx={{ color: mode === 'light' ? '#54656f' : '#8696a0' }} />
          </IconButton>
        )}
      </Box>

      <Tooltip title={showUnreadOnly ? 'Show all chats' : 'Filter by unread'}>
        <IconButton
          size="small"
          onClick={onToggleUnreadOnly}
          sx={{
            bgcolor: showUnreadOnly
              ? mode === 'light'
                ? '#008069'
                : '#00a884'
              : 'transparent',
            color: showUnreadOnly
              ? '#ffffff'
              : mode === 'light'
              ? '#54656f'
              : '#8696a0',
            '&:hover': {
              bgcolor: showUnreadOnly
                ? mode === 'light'
                  ? '#006d59'
                  : '#009071'
                : mode === 'light'
                ? '#e9edef'
                : '#202c33',
            },
          }}
        >
          <FilterListIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
