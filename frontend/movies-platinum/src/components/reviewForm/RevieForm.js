import React, { useState } from 'react';
import axios from '../../api/axiosConfig';

const ReviewForm = ({ movieId, userEmail }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('review/add-review', {
        userEmail,
        movieId,
        rating,
        comment,
      });

      if (response.status === 200) {
        // Handle successful review submission
        console.log('Review submitted successfully');
        // You might want to update the UI or display a message here
      }
    } catch (error) {
      // Handle error during review submission
      console.error('Error submitting review:', error);
      // You might want to display an error message to the user
    }
  };

  return (
    <div>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            min="0"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
