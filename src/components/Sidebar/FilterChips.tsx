'use client';

import React from 'react';
import { Box, Chip } from '@mui/material';
import { FilterType } from '../../types/chat';
import { useColorMode } from '../ThemeRegistry';

interface FilterChipsProps {
  currentFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
}

export default function FilterChips({ currentFilter, onSelectFilter }: FilterChipsProps) {
  const { mode } = useColorMode();

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread' },
    { key: 'favorites', label: 'Favorites' },
    { key: 'groups', label: 'Groups' },
  ];

  return (
    <Box
      sx={{
        px: 1.5,
        py: 1,
        display: 'flex',
        gap: 1,
        overflowX: 'auto',
        bgcolor: mode === 'light' ? '#ffffff' : '#111b21',
        borderBottom: 1,
        borderColor: 'divider',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {filters.map((f) => {
        const isSelected = currentFilter === f.key;
        return (
          <Chip
            key={f.key}
            label={f.label}
            size="small"
            clickable
            onClick={() => onSelectFilter(f.key)}
            sx={{
              fontWeight: 500,
              fontSize: '0.8rem',
              bgcolor: isSelected
                ? mode === 'light'
                  ? '#e7fce3'
                  : '#0a332c'
                : mode === 'light'
                ? '#f0f2f5'
                : '#202c33',
              color: isSelected
                ? mode === 'light'
                  ? '#008069'
                  : '#00a884'
                : mode === 'light'
                ? '#54656f'
                : '#8696a0',
              border: 'none',
              '&:hover': {
                bgcolor: isSelected
                  ? mode === 'light'
                    ? '#dcf8c6'
                    : '#0e433a'
                  : mode === 'light'
                  ? '#e9edef'
                  : '#2a3942',
              },
            }}
          />
        );
      })}
    </Box>
  );
}
