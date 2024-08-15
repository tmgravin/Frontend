import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { getUserFromCookies } from '@/components/auth/token';

const user = getUserFromCookies();

interface Review {
  review: {
    id: number;
    rating: number;
    comment: string;
    createdAt: string;
    doer: {
      name: string;
    };
  };
  doerId: number;
  likesCount: number;
  disLikesCount: number;
}

interface ReviewRatingProps {
  doerName: string;
  open: boolean;
  onClose: () => void;
  doerId: number;
}

const ReviewRating: React.FC<ReviewRatingProps> = ({ open, onClose, doerId, doerName }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rateModalOpen, setRateModalOpen] = useState<boolean>(false);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);

  useEffect(() => {
    if (open) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/review/?doerId=${doerId}`, {
        withCredentials: true
      })
        .then(response => {
          const fetchedReviews = response.data;
          setReviews(fetchedReviews);
          calculateRatingStats(fetchedReviews);
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
          // Handle the error here, e.g., show a notification to the user
        });
    }
  }, [open]);

  const calculateRatingStats = (reviews: Review[]) => {
    const total = reviews.length;
    const sum = reviews.reduce((acc, review) => acc + review.review.rating, 0);
    const avg = total > 0 ? sum / total : 0;
    setAverageRating(avg);
    setTotalRatings(total);
  };

  const handleRateClick = () => {
    setRateModalOpen(true);
  };

  const handleRateModalClose = () => {
    setRateModalOpen(false);
  };

  const handleLike = async (reviewId: number) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/review/likes`, {
        users: { id: user.id }, // Use the correct user ID here
        reviews: { id: reviewId },
        likes: 'L'
      }, {
        withCredentials: true
      });
      // Update the state to reflect the change
      const updatedReviews = reviews.map(review =>
        review.review.id === reviewId
          ? { ...review, likesCount: review.likesCount + 1 }
          : review
      );
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error liking the review:', error);
    }
  };

  const handleDislike = async (reviewId: number) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/review/likes`, {
        users: { id: user.id }, // Use the correct user ID here
        reviews: { id: reviewId },
        likes: 'D'
      }, {
        withCredentials: true
      });
      // Update the state to reflect the change
      const updatedReviews = reviews.map(review =>
        review.review.id === reviewId
          ? { ...review, disLikesCount: review.disLikesCount + 1 }
          : review
      );
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error disliking the review:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{doerName}</Typography>
          <Box>
            <Button variant="outlined" onClick={handleRateClick} sx={{ mr: 1 }}>
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
              <FontAwesomeIcon icon={faStar} color="#FFD700" style={{ marginLeft: 8, marginRight: 8 }} />
              <Box flexGrow={1} height={8} bgcolor="#E0E0E0" position="relative">
                <Box
                  height="100%"
                  bgcolor={star === 5 ? '#4CAF50' : star === 4 ? '#8BC34A' : star === 3 ? '#FFEB3B' : star === 2 ? '#FF9800' : '#F44336'}
                  width={`${(reviews.filter((review) => review.review.rating === star).length / totalRatings) * 100}%`}
                />
              </Box>
              <Typography style={{ marginLeft: 8 }}>
                {reviews.filter((review) => review.review.rating === star).length}
              </Typography>
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
                    {[...Array(review.review.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} color="#FFD700" />
                    ))}
                    <Typography variant="body1" style={{ marginLeft: 8 }}>
                      {review.review.comment}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body2" component="span">
                      {review.review.doer.name}
                    </Typography>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ marginLeft: 8, cursor: 'pointer' }}
                      onClick={() => handleLike(review.review.id)}
                    />
                    <Typography variant="body2" component="span" style={{ marginLeft: 8 }}>
                      {review.likesCount}
                    </Typography>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      style={{ marginLeft: 8, cursor: 'pointer' }}
                      onClick={() => handleDislike(review.review.id)}
                    />
                    <Typography variant="body2" component="span" style={{ marginLeft: 8 }}>
                      {review.disLikesCount}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
      <RateTeacherModal open={rateModalOpen} onClose={handleRateModalClose} doerId={doerId} userId={user.id} />
    </Dialog>
  );
};

export default ReviewRating;
