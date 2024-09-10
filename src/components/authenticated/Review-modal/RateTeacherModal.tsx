import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Box,
  Rating,
} from "@mui/material";
import axios from "axios";

interface RateTeacherModalProps {
  open: boolean;
  onClose: () => void;
  userId: any;
  doerId: number;
}

const RateTeacherModal: React.FC<RateTeacherModalProps> = ({
  open,
  onClose,
  doerId,
  userId,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  const handleSave = async () => {
    if (rating === null) {
      // Show error message or alert
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/review/`,
        {
          users: { id: userId },
          doer: { id: doerId },
          rating,
          comment,
        },
        {
          withCredentials: true,
        }
      );

      onClose();
    } catch (error) {
      console.error("Error saving review:", error);
      // Handle the error here, e.g., show a notification to the user
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Rate Teacher</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6">Rate the teacher</Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large"
            sx={{ mt: 2 }}
          />
          <TextField
            label="Comment"
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2, width: "100%" }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          className="text-black bg-slate-200 hover:bg-slate-300"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="primary-orangebg hover:bg-orange-600 text-white"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RateTeacherModal;
