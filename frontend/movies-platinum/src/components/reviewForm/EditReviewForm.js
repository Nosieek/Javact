import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import './CustomModal.css';

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
    <Modal show={show} onHide={handleClose} className='custom-modal' centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRating">
            <Form.Label>Rating:</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="0.1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formComment">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditReviewForm;
