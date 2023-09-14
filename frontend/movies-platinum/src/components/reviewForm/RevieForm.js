
// import React, { useState } from 'react';
// import axios from '../../api/axiosConfig';
// import { useCookies } from 'react-cookie';
// import jwtDecode from "jwt-decode";

// const ReviewForm = ({ movieId, onReviewAdded }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [cookies] = useCookies(['token']);

//   const getUserEmailFromToken = (token) => {
//     const decodedToken = jwtDecode(token);
//     const userEmail = decodedToken.sub;
//     return userEmail;
//   };
//   const userEmail = getUserEmailFromToken(cookies.token);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const reviewData = {
//       userEmail,
//       movieId,
//       rating,
//       comment,
//     };

//     try {
//       const token = cookies.token;
//       const response = await axios.post(`review/add-review`, reviewData, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (response.status === 200) {
//         console.log('Review submitted successfully');
//         // Wywołaj funkcję przekazaną jako prop do zaktualizowania listy recenzji w MovieDetail
//         onReviewAdded();
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Leave a Review</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Rating:</label>
//           <input
//             type="number"
//             min="0"
//             max="10"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Comment:</label>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//         </div>
//         <button type="submit">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;

import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

const ReviewForm = ({
  movieId,
  onReviewAdded,
  initialRating,
  initialComment,
}) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [comment, setComment] = useState(initialComment || '');
  const [cookies] = useCookies(['token']);

  const getUserEmailFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.sub;
    return userEmail;
  };
  const userEmail = getUserEmailFromToken(cookies.token);

  useEffect(() => {
    // Aktualizuj rating i comment przy zmianie initialRating i initialComment
    setRating(initialRating || 0);
    setComment(initialComment || '');
  }, [initialRating, initialComment]);

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
      const response = await axios.post(`review/add-review`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Review submitted successfully');
        onReviewAdded();
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
