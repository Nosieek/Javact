import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopRanked.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Import jwt-decode library
import userEvent from '@testing-library/user-event';

const TopRanked = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = cookies.token;

  //   if (!token) {
  //     navigate('/Login');
  //   }
  // }, [cookies, navigate]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const getUserEmailFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.sub;
    return userEmail;
  };

  const fetchMovies = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8080/api/movies/top?page=${page}`);

      if (response.status !== 200) {
        throw new Error('Error fetching movies');
      }

      setMovies(response.data);
    } catch (error) {
      setError('Error fetching movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const addToWatchlist = async (movieId) => {
    try {
      const userEmail = getUserEmailFromToken(cookies.token);
  
      const url = `http://localhost:8080/api/movies/addFav?email=${userEmail}&movieId=${movieId}`;
      const response = await axios.post(url);
      console.log(response.data); // You can display the server response, e.g., success message
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
    }
    console.log(getUserEmailFromToken(cookies.token)); // Call the function to log the user email
    console.log(`Added movie with ID ${movieId} to watchlist.`);
  };
  
  

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`star-${i}`} icon={faStar} className="star-icon" />);
    }

    if (halfStar) {
      stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalfAlt} className="star-icon" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-star-${i}`} icon={faStar} className="star-icon" />);
    }

    return <div className="rating-stars">{stars}</div>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Top Ranked Movies</h1>
      {movies.map((movie) => (
        <div key={movie.id} className="movie">
          <div className="left-column">
            <img
              className="movie-image"
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title}
            />
            <div className="movie-details">
              <h2 className="title">{movie.title}</h2>
              <p className="overview">{movie.overview}</p>
              <p className="release-date">
                Rating: {movie.vote_average} {renderRatingStars(movie.vote_average)}
              </p>
            </div>
          </div>
          <div className="right-column">
            <div className="play-button-icon-container">
              <FontAwesomeIcon
                className="play-button-icon"
                icon={faHeartCirclePlus}
                onClick={() => addToWatchlist(movie.id)}
              />
            </div>
            <div className="play-button-icon-container">
              <FontAwesomeIcon className="play-button-icon" icon={faMagnifyingGlass} />
            </div>
          </div>
        </div>
      ))}

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previousa
        </button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TopRanked;
