import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { Modal, Button } from 'react-bootstrap';

const ReviewForm = ({ movieId, onReviewAdded, reviewToEdit }) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (reviewToEdit) {
      loadReviewForEditing();
    } else {
      clearForm();
    }
  }, [reviewToEdit]);

  const getUserEmailFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.sub;
    return userEmail;
  };
  const userEmail = getUserEmailFromToken(cookies.token);

  const handleClose = () => {
    setShow(false);
    clearForm();
  };

  const handleShow = () => {
    setShow(true);
  };

  const clearForm = () => {
    setRating(0);
    setComment('');
  };

  const loadReviewForEditing = async () => {
    if (!reviewToEdit) {
      return;
    }

    const { rating, comment } = reviewToEdit;

    setRating(rating);
    setComment(comment);
  };

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
      if (reviewToEdit) {
        // Jeśli mamy reviewToEdit, to edytujemy recenzję
        const response = await axios.put(
          `review/edit-review?reviewId=${reviewToEdit}`,
          reviewData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log('Review edited successfully');
          onReviewAdded();
          handleClose();
        }
      } else {
        const response = await axios.post(`review/add-review`, reviewData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log('Review submitted successfully');
          onReviewAdded();
          handleClose();
        }
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        {reviewToEdit ? 'Edit Review' : 'Leave a Review'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {reviewToEdit ? 'Edit Review' : 'Leave a Review'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {reviewToEdit ? 'Edit Review' : 'Submit Review'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewForm;
