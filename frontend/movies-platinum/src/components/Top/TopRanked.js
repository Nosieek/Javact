import React, { useState, useEffect, useRef } from 'react';
import axios from '../../api/axiosConfig'
import './TopRanked.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleMinus, faHeartCirclePlus, faMagnifyingGlass, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { BeatLoader } from 'react-spinners'; // importowanie BeatLoader

const TopRanked = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [cookies, setCookies, removeCookies] = useCookies(['token']);
  const navigate = useNavigate();
  const logoutTimeoutRef = useRef(null);

  const handleLogout = () => {
    removeCookies('token');
    navigate('/Login?logout=true');
  };

  const resetLogoutTimeout = () => {
    clearTimeout(logoutTimeoutRef.current);
    logoutTimeoutRef.current = setTimeout(handleLogout, 300000); // 5 minut (300000 milisekund)
  };

  useEffect(() => {
    const token = cookies.token;
    if (!token) {
      navigate('/Login');
    } else {
      fetchMovies(currentPage);
    }
  }, [currentPage, cookies, navigate]);

  useEffect(() => {
    const handleMouseMove = () => {
      resetLogoutTimeout();
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(logoutTimeoutRef.current);
    };
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getUserEmailFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.sub;
    return userEmail;
  };

  const fetchMovies = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const tk = cookies.token;
      const response = await axios.get(`movies/top?page=${page}`, {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });
      if (response.status === 200) {
        setMovies(response.data);
      } else {
        throw new Error('Error fetching movies');
      }
    } catch (error) {
      setError('Error fetching movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavoritelist = async (movieId) => {
    try {
      const userEmail = getUserEmailFromToken(cookies.token);
      const tk = cookies.token;
      console.log(movieId)
      const response = await axios.post(
        `movies/addFav?email=${userEmail}&movieId=${movieId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tk}`
          }
        }
      );
    } catch (error) {
      console.error('Error adding movie to favoritelist:', error);
    }
  };

  const getMovieDetail = async (movieId) => {
    navigate(`/movie/${movieId}`);
    console.log(movieId);
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
    return (
      <div className="container">
        <h1>Top Ranked Movies</h1>
        <div className="loading">
          <BeatLoader color="#ffffff" loading={loading} size={15} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Top Ranked Movies</h1>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    
    <div className="container">
      
      <h1>Top Ranked Movies</h1>
      
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>

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
              <div className="overview">{movie.overview}</div>
              <div className="release-date">
                Rating: {movie.vote_average}/10 {renderRatingStars(movie.vote_average)}
              </div>
            </div>
          </div>
          <div className="right-column">
            <div className="play-button-icon-container">
              <FontAwesomeIcon
                className="top-icon"
                icon={faHeartCirclePlus}
                onClick={() => addToFavoritelist(movie.id)}
              />
              {/* <FontAwesomeIcon
                className="top-icon"
                icon={faHeartCircleMinus}
                onClick={() => rmr(movie.id)}
              /> */}
              <FontAwesomeIcon
                className="top-icon"
                icon={faMagnifyingGlass}
                onClick={() => getMovieDetail(movie.id)}
              />
            </div>

          </div>
        </div>
      ))}

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TopRanked;
