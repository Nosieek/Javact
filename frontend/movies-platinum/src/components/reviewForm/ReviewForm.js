import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useCookies } from 'react-cookie';
import jwtDecode from "jwt-decode";
import { Modal, Button } from 'react-bootstrap';

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [cookies] = useCookies(['token']);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    if (editingReviewId) {
      loadReviewForEditing();
    }
  }, [editingReviewId]);

  const getUserEmailFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.sub;
    return userEmail;
  };
  const userEmail = getUserEmailFromToken(cookies.token);

  const handleClose = () => {
    setShow(false);
    setEditingReviewId(null);
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
    try {
      const tk = cookies.token;
      const response = await axios.get(`review/get-review?reviewId=${editingReviewId}`, {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });

      if (response.status === 200) {
        const review = response.data;
        setRating(review.rating);
        setComment(review.comment);
      }
    } catch (error) {
      console.error('Error loading review for editing:', error);
    }
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
      if (editingReviewId) {
        // Jeśli mamy editingReviewId, to edytujemy recenzję
        const response = await axios.post(`review/edit-review?reviewId=${editingReviewId}`, reviewData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          console.log('Review edited successfully');
          onReviewAdded();
          handleClose();
        }
      } else {
        const response = await axios.post(`review/add-review`, reviewData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
        Leave a Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingReviewId ? 'Edit Review' : 'Leave a Review'}</Modal.Title>
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
              {editingReviewId ? 'Edit Review' : 'Submit Review'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewForm;
