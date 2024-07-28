import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp, faThumbsDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import RateTeacherModal from './RateTeacherModal';

interface Review {
  rating: number;
  comment: string;
  reviewer: string;
}

interface ReviewRatingProps {
  open: boolean;
  onClose: () => void;
  reviews: Review[];
  averageRating: number;
  totalRatings: number;
}

const ReviewRating: React.FC<ReviewRatingProps> = ({
  open,
  onClose,
  reviews,
  averageRating,
  totalRatings,
}) => {
  const [rateModalOpen, setRateModalOpen] = useState<boolean>(false);

  const handleRateClick = () => {
    setRateModalOpen(true);
  };

  const handleRateModalClose = () => {
    setRateModalOpen(false);
  };

  const handleRateSave = (review: { rating: number; comment: string }) => {
    // Handle saving the review here (e.g., updating state, sending to API, etc.)
    console.log('Saved review:', review);
    // For demonstration purposes, we'll add the review to the reviews array.
    // In a real application, you would likely update state or make an API call.
    reviews.push({ ...review, reviewer: 'Anonymous' });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Roshan Bhusal</Typography>
          <Box>
            <Button variant="outlined" onClick={handleRateClick} style={{ marginRight: 8 }}>
              Rate Teacher
            </Button>
            <IconButton onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">Ratings & Reviews</Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h4" component="span">
            {averageRating.toFixed(1)}
          </Typography>
          <FontAwesomeIcon icon={faStar} color="#FFD700" style={{ marginLeft: 8 }} />
          <Typography variant="body2" component="span" style={{ marginLeft: 8 }}>
            {totalRatings} Ratings & {reviews.length} Reviews
          </Typography>
        </Box>
        <Box mb={2}>
          {[5, 4, 3, 2, 1].map((star) => (
            <Box display="flex" alignItems="center" key={star}>
              <Typography>{star}</Typography>
              <FontAwesomeIcon icon={faStar} color="#FFD700" style={{ marginLeft: 4, marginRight: 4 }} />
              <Box flexGrow={1} height={8} bgcolor="#E0E0E0" position="relative">
                <Box
                  height="100%"
                  bgcolor={star === 5 ? '#4CAF50' : star === 4 ? '#8BC34A' : star === 3 ? '#FFEB3B' : star === 2 ? '#FF9800' : '#F44336'}
                  width={`${(reviews.filter((review) => review.rating === star).length / totalRatings) * 100}%`}
                />
              </Box>
              <Typography style={{ marginLeft: 8 }}>{reviews.filter((review) => review.rating === star).length}</Typography>
            </Box>
          ))}
        </Box>
        <Divider />
        <List>
          {reviews.map((review, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    {[...Array(review.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} color="#FFD700" />
                    ))}
                    <Typography variant="body1" style={{ marginLeft: 8 }}>
                      {review.comment}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body2" component="span">
                      {review.reviewer}
                    </Typography>
                    <FontAwesomeIcon icon={faThumbsUp} style={{ marginLeft: 8, cursor: 'pointer' }} />
                    <FontAwesomeIcon icon={faThumbsDown} style={{ marginLeft: 8, cursor: 'pointer' }} />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <RateTeacherModal
        open={rateModalOpen}
        onClose={handleRateModalClose}
        onSave={handleRateSave}
      />
    </Dialog>
  );
};

export default ReviewRating;
