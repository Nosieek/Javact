import React, { useState } from 'react';
import axios from '../../api/axiosConfig';
import { useCookies } from 'react-cookie';
const ReviewForm = ({ movieId, userEmail }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [cookies, , removeCookie] = useCookies(["token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      userEmail,
      movieId,
      rating,
      comment,
    };

    try {
      const token = cookies.token;
      console.log(token);
      const response = await axios.post(`movies/addReview?email=${userEmail}&movieId=${movieId}&rating=${rating}&review=${comment}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        console.log('Review submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
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
