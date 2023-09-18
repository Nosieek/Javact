import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { Modal, Button } from 'react-bootstrap';

const EditReviewForm = ({ reviewToEdit, onReviewEdited }) => {
  const [show, setShow] = useState(true);
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
      rating,
      comment,
    };
  
    try {
      const token = cookies.token;
      const response = await axios.put(
        `review/edit-review?reviewId=${reviewToEdit.id}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log('Recenzja została zaktualizowana');
        onReviewEdited(reviewData);
        handleClose();
      }
    } catch (error) {
      console.error('Błąd podczas edycji recenzji:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edytuj recenzję</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Ocena:</label>
            <input
              type="number"
              min="0"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div>
            <label>Komentarz:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
          <Button variant="primary" type="submit">
            Zapisz
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditReviewForm;
