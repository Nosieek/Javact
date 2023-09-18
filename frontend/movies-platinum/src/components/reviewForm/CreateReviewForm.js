import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { Modal, Button, Form } from 'react-bootstrap'; 
import './CustomModal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark} from "@fortawesome/free-solid-svg-icons";

const CreateReviewForm = ({ movieId, onReviewAdded }) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [cookies] = useCookies(['token']);

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
        handleClose();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={handleShow}>
        Leave a Review
      </Button>

      <Modal show={show} onHide={handleClose} className='custom-modal' centered>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review</Modal.Title>
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
              className="custom-textarea" 
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose} className="custom-modal-btn">
            Close
          </Button>

            <Button variant="primary" type="submit">
              Submit Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateReviewForm;
