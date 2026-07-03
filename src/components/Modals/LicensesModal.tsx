'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';
import { useColorMode } from '../ThemeRegistry';

interface LicensesModalProps {
  open: boolean;
  onClose: () => void;
}

const licenseData = [
  {
    name: '1. MIT License',
    type: 'Permissive',
    summary:
      'A simple and permissive open-source license. It allows anyone to deal in the Software without restriction, including rights to use, copy, modify, merge, publish, and distribute, provided the copyright and permission notice are preserved.',
  },
  {
    name: '2. Apache 2.0',
    type: 'Permissive with Patent Grant',
    summary:
      'A permissive license that, in addition to copyright permissions, provides an express grant of patent rights from contributors to users and includes terms for trademarks.',
  },
  {
    name: '3. BSD 3-Clause',
    type: 'Permissive',
    summary:
      'A permissive license similar to MIT with a 3rd clause explicitly prohibiting the use of contributors names to endorse or promote derived products without specific prior permission.',
  },
  {
    name: '4. GNU GPL v3',
    type: 'Strong Copyleft',
    summary:
      'Guarantees end users the four freedoms to run, study, share, and modify the software. Any derivative works distributed must also make their complete source code available under GPL v3.',
  },
  {
    name: '5. MPL 2.0',
    type: 'Weak Copyleft',
    summary:
      'The Mozilla Public License is a file-level copyleft license that balances open-source modification with commercial use, allowing proprietary code in separate files.',
  },
  {
    name: '6. ISC License',
    type: 'Permissive',
    summary:
      'Functionally equivalent to the Two-Clause BSD and MIT licenses, simplified by removing language deemed unnecessary under the Berne Convention.',
  },
  {
    name: '7. The Unlicense',
    type: 'Public Domain',
    summary:
      'A template for releasing software into the public domain, waiving all copyright and related rights so anyone is free to copy, modify, publish, or distribute.',
  },
  {
    name: '8. EPL 2.0',
    type: 'Copyleft',
    summary:
      'The Eclipse Public License 2.0 is an enterprise-friendly open source license that requires modifications to EPL-licensed files to be made available.',
  },
  {
    name: '9. Boost 1.0',
    type: 'Permissive',
    summary:
      'Originally used for Boost C++ libraries, it allows both binary and source distribution without requiring attribution in binary-only releases.',
  },
  {
    name: '10. CC-BY 4.0',
    type: 'Attribution',
    summary:
      'Creative Commons Attribution license allows sharing and adapting material for any purpose, including commercial, provided appropriate credit is given.',
  },
];

export default function LicensesModal({ open, onClose }: LicensesModalProps) {
  const { mode } = useColorMode();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{ paper: {
        sx: {
          bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
          color: mode === 'light' ? '#111b21' : '#e9edef',
          borderRadius: 3,
        },
      }}}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PolicyIcon sx={{ color: '#00a884' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          10 Open Source Licenses Included
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: 'divider' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          This educational repository includes 10 open-source licensing guides in the <code>/licenses</code> directory for learning and reference purposes. Developer: <strong>Tonderai Kawere</strong> (<a href="https://tonde-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a884' }}>Portfolio</a>).
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={(_, val) => setSelectedTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: mode === 'light' ? '#54656f' : '#8696a0',
                textTransform: 'none',
                fontSize: '0.825rem',
                fontWeight: 600,
                '&.Mui-selected': { color: '#00a884' },
              },
              '& .MuiTabs-indicator': { backgroundColor: '#00a884' },
            }}
          >
            {licenseData.map((lic, index) => (
              <Tab key={index} label={lic.name} />
            ))}
          </Tabs>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#00a884' }}>
              {licenseData[selectedTab].name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                bgcolor: mode === 'light' ? '#e7fce3' : '#0a332c',
                color: mode === 'light' ? '#008069' : '#00a884',
                px: 1,
                py: 0.3,
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              {licenseData[selectedTab].type}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
            {licenseData[selectedTab].summary}
          </Typography>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
