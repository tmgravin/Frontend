import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface RateTeacherModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (review: { rating: number; comment: string }) => void;
}

const RateTeacherModal: React.FC<RateTeacherModalProps> = ({ open, onClose, onSave }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(-1);
  const [comment, setComment] = useState<string>('');

  const handleSave = () => {
    onSave({ rating, comment });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Rate and Review Teacher</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Rating</Typography>
        <Box display="flex" alignItems="center" mb={2}>
          {[...Array(5)].map((_, index) => (
            <IconButton
              key={index}
              onClick={() => setRating(index + 1)}
              onMouseEnter={() => setHover(index + 1)}
              onMouseLeave={() => setHover(-1)}
              color={index + 1 <= (hover || rating) ? 'primary' : 'default'}
            >
              <FontAwesomeIcon icon={faStar} />
            </IconButton>
          ))}
        </Box>
        <TextField
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RateTeacherModal;
