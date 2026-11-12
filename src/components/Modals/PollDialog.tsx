'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PollIcon from '@mui/icons-material/Poll';
import { useColorMode } from '../ThemeRegistry';

interface PollDialogProps {
  open: boolean;
  onClose: () => void;
  onCreatePoll: (question: string, options: string[]) => void;
}

export default function PollDialog({ open, onClose, onCreatePoll }: PollDialogProps) {
  const { mode } = useColorMode();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const handleAddOption = () => {
    if (options.length < 8) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, val: string) => {
    const updated = [...options];
    updated[index] = val;
    setOptions(updated);
  };

  const handleCreate = () => {
    const validOptions = options.map((o) => o.trim()).filter(Boolean);
    if (!question.trim() || validOptions.length < 2) return;
    onCreatePoll(question.trim(), validOptions);
    setQuestion('');
    setOptions(['', '']);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: mode === 'light' ? '#ffffff' : '#202c33',
            color: mode === 'light' ? '#111b21' : '#e9edef',
            borderRadius: 3,
          },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PollIcon sx={{ color: '#00a884' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Create Poll
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: 'divider', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Question"
          placeholder="Ask a question"
          fullWidth
          size="small"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              color: mode === 'light' ? '#111b21' : '#e9edef',
              bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
            },
          }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            Options (min 2)
          </Typography>
          {options.map((opt, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                placeholder={`Option ${idx + 1}`}
                fullWidth
                size="small"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                sx={{
                  '& .MuiInputBase-root': {
                    color: mode === 'light' ? '#111b21' : '#e9edef',
                    bgcolor: mode === 'light' ? '#f0f2f5' : '#111b21',
                  },
                }}
              />
              {options.length > 2 && (
                <IconButton size="small" onClick={() => handleRemoveOption(idx)} sx={{ color: '#f15c6d' }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}

          {options.length < 8 && (
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddOption}
              sx={{
                color: '#00a884',
                alignSelf: 'flex-start',
                textTransform: 'none',
                fontWeight: 600,
                mt: 0.5,
              }}
            >
              Add Option
            </Button>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={!question.trim() || options.filter((o) => o.trim()).length < 2}
          sx={{
            bgcolor: '#00a884',
            color: '#fff',
            '&:hover': { bgcolor: '#008f6f' },
          }}
        >
          Send Poll
        </Button>
      </DialogActions>
    </Dialog>
  );
}
