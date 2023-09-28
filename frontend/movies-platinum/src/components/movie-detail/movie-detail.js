import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './movie-detail.css';
import NotFoundPage from '../404page/page404';
import jwtDecode from "jwt-decode";
import EditReviewForm from '../reviewForm/EditReviewForm';
import CreateReviewForm from '../reviewForm/CreateReviewForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash,faPenToSquare, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['token']);
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const [editedReview, setEditedReview] = useState(null);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
  useEffect(() => {
    fetchMovieDetails();
    fetchMovieReview();
  }, [movieId]);

  const handleEditReview = (reviewId) => {
    setEditingReviewId(reviewId);
  };

  const handleDeleteReview = async(reviewId) => {
    try {
      const tk = cookies.token;
      await axios.delete(`review/delete/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${tk}`,
        },
      });
  
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const fetchMovieDetails = async () => {
    try {
      const tk = cookies.token;
      const response = await axios.get(`movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${tk}`,
        },
      });
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setLoading(false);
    }
  };

  const fetchMovieReview = async () => {
    try {
      const tk = cookies.token;
      const response = await axios.get(`review/movie-reviews?imdb=${movieId}`, {
        headers: {
          Authorization: `Bearer ${tk}`,
        },
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <NotFoundPage />;
  }

  const getUserEmailFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.sub;
    return userEmail;
  };
  const userEmail = getUserEmailFromToken(cookies.token);

  const isUserReview = (review, email) => {
    return review.email === email;
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.fullDate);
    const dateB = new Date(b.fullDate);
    return dateB - dateA; 
  });

  const onReviewEdited = (editedReviewId, editedReviewData) => {
    setReviews((prevReviews) => {
      return prevReviews.map((review) => {
        if (review.id === editedReviewId) {
          return { ...review, ...editedReviewData };
        } else {
          return review;
        }
      });
    });
    window.location.reload();
    history.push(`/movie/${movieId}`);
  };

  return (
    <div className="movie-detail-container">
    <Container>
      <Row>
        <Col>
          <h3>{movie.title}</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
        <div className="light-rays-container">
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
          /></div>
        </Col>
        <Col>
          <>
            <Row>
              <Col>
                <h5>Release Date:</h5>
                {movie.relaseDate}
                <hr />
                <h5>Overview:</h5>
                {movie.overview}
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
                <h5>Vote Average:</h5>
                {movie.vote_average}
                <hr />
              </Col>
            </Row>
          </>
          <h3>Trailer</h3>
          <div className="yt-video-container">
            <iframe
              className="yt-video"
              title="Trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movie.ytTrailer}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Review</h3>
          <CreateReviewForm movieId={movieId} onReviewAdded={fetchMovieReview} />

          <hr />
          {sortedReviews.length > 0 && (
          <>
            {sortedReviews.map((review) => (
              <div key={review.id} className="review-container review-border">
                <div className="left-section">
                  <p>Username: {review.username}</p>
                  <p>
                    Rating:{" "}
                    {[...Array(10)].map((_, index) => (
                      <span
                        key={index}
                        style={{
                          color:
                            index < Math.floor(review.rating)
                              ? "orange"
                              : index === Math.floor(review.rating) &&
                                review.rating % 1 !== 0
                              ? "orange"
                              : "gray",
                          marginRight: "2px",
                        }}
                      >
                        {index < Math.floor(review.rating) ? (
                          <FontAwesomeIcon icon={faStar} />
                        ) : index === Math.floor(review.rating) &&
                          review.rating % 1 !== 0 ? (
                          <FontAwesomeIcon icon={faStarHalfAlt} />
                        ) : (
                          <FontAwesomeIcon icon={faStar} />
                        )}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="center-section">
                
                  <p>Comment:</p>
                  <p className="comment-text">{review.comment}</p>
                </div>
                <div className="right-section">
                <div className="date-container">
                  <p>Date:</p>
                  <p>{formatDate(review.fullDate)}</p>
                  {isUserReview(review, userEmail) && (
                    <div>
                      <FontAwesomeIcon
                        variant="outline-primary"
                        onClick={() => handleEditReview(review.id)}
                        icon={faPenToSquare}
                      />

                      <FontAwesomeIcon
                        onClick={() => handleDeleteReview(review.id)}
                        icon={faTrash}
                        color="red"
                      />
                    </div>
                  )}
               </div>

                {editingReviewId === review.id && (
                  <EditReviewForm
                    reviewToEdit={review}
                    onReviewEdited={onReviewEdited}

                  />
                )}
                </div>
                <hr />
              </div>
            ))}
          </>
        )}

        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default MovieDetail;
