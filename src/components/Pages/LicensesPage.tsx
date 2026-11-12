'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PolicyIcon from '@mui/icons-material/Policy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useColorMode } from '../ThemeRegistry';
import { detailedLicenses } from '../../data/licensesData';

interface LicensesPageProps {
  onBack: () => void;
}

export default function LicensesPage({ onBack }: LicensesPageProps) {
  const { mode } = useColorMode();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copyToast, setCopyToast] = useState(false);

  const categories = ['All', 'Permissive', 'Copyleft', 'Public Domain', 'Creative Commons'];

  const filteredLicenses = detailedLicenses.filter((lic) => {
    const matchesSearch =
      lic.name.toLowerCase().includes(search.toLowerCase()) ||
      lic.spdxId.toLowerCase().includes(search.toLowerCase()) ||
      lic.summary.toLowerCase().includes(search.toLowerCase()) ||
      lic.guide.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory !== 'All' && lic.category !== selectedCategory) return false;
    return true;
  });

  const handleCopy = (text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyToast(true);
    }
  };

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
          10 Open Source Licenses
        </Typography>
      </Box>

      {/* Search & Filter Bar */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: mode === 'light' ? '#ffffff' : '#111b21' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: mode === 'light' ? '#f0f2f5' : '#202c33',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            mb: 1.5,
          }}
        >
          <SearchIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase
            placeholder="Search license by name or keywords..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ fontSize: '0.875rem', color: mode === 'light' ? '#111b21' : '#e9edef' }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 0.8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              size="small"
              clickable
              onClick={() => setSelectedCategory(cat)}
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                bgcolor: selectedCategory === cat ? (mode === 'light' ? '#008069' : '#00a884') : (mode === 'light' ? '#f0f2f5' : '#202c33'),
                color: selectedCategory === cat ? '#ffffff' : 'text.secondary',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* License List (In-Place Scrollable Page) */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ bgcolor: mode === 'light' ? '#e7fce3' : '#0a332c', p: 1.5, borderRadius: 2, border: '1px solid', borderColor: mode === 'light' ? '#c2f1bc' : '#145247' }}>
          <Typography variant="caption" sx={{ color: mode === 'light' ? '#008069' : '#00a884', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PolicyIcon fontSize="small" /> Educational Licensing Hub by Tonderai Kawere
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
            Review the complete terms, permissions, and conditions of 10 industry-standard open-source licenses.
          </Typography>
        </Box>

        {filteredLicenses.map((lic) => (
          <Accordion
            key={lic.id}
            disableGutters
            sx={{
              bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
              color: mode === 'light' ? '#111b21' : '#e9edef',
              borderRadius: '8px !important',
              border: '1px solid',
              borderColor: 'divider',
              '&:before': { display: 'none' },
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {lic.name}
                  </Typography>
                  <Chip
                    label={lic.category}
                    size="small"
                    sx={{
                      fontSize: '0.68rem',
                      height: 20,
                      fontWeight: 600,
                      bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
                      color: '#00a884',
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.3 }}>
                  {lic.summary}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
              {/* Permissions & Conditions Badges */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, mb: 2 }}>
                <Box sx={{ bgcolor: mode === 'light' ? '#f9fbf9' : '#182229', p: 1.5, borderRadius: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#008069', display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <CheckCircleIcon fontSize="inherit" /> Permissions
                  </Typography>
                  {lic.permissions.map((p) => (
                    <Typography key={p} variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                      • {p}
                    </Typography>
                  ))}
                </Box>

                <Box sx={{ bgcolor: mode === 'light' ? '#fbfaf9' : '#182229', p: 1.5, borderRadius: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#f5a623', display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <InfoOutlinedIcon fontSize="inherit" /> Conditions & Limitations
                  </Typography>
                  {lic.conditions.map((c) => (
                    <Typography key={c} variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                      • {c}
                    </Typography>
                  ))}
                  {lic.limitations.map((l) => (
                    <Typography key={l} variant="caption" sx={{ display: 'block', color: '#f15c6d' }}>
                      ✕ {l}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {/* Developer Practical Guide */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#00a884', display: 'block', mb: 0.5 }}>
                  Developer Integration Guide:
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.825rem', lineHeight: 1.5 }}>
                  {lic.guide}
                </Typography>
              </Box>

              {/* Full Verbatim License Text */}
              <Box sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                    Full Standard Legal Text ({lic.spdxId}):
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon fontSize="small" />}
                    onClick={() => handleCopy(lic.fullText)}
                    sx={{ color: '#00a884', textTransform: 'none', fontSize: '0.75rem' }}
                  >
                    Copy Text
                  </Button>
                </Box>
                <Box
                  component="pre"
                  sx={{
                    bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
                    p: 1.5,
                    borderRadius: 2,
                    fontSize: '0.725rem',
                    fontFamily: 'monospace',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    maxHeight: 240,
                    overflowY: 'auto',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  {lic.fullText}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Copy Toast */}
      <Snackbar
        open={copyToast}
        autoHideDuration={2000}
        onClose={() => setCopyToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ bgcolor: '#00a884', color: '#fff' }}>
          License text copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}
