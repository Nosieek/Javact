import React, { useState, useEffect, useRef } from 'react';
import axios from '../../api/axiosConfig';
import './TopRanked.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
  faMagnifyingGlass,
  faStar,
  faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { BeatLoader } from 'react-spinners';

const TopRanked = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);


  useEffect(() => {
    const token = cookies.token;
    if (!token) {
      navigate('/Login');
    } else {
      fetchMovies(currentPage);
      fetchFavorites();
    }
  }, [currentPage, cookies, navigate]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const token = cookies.token;
      const userEmail = getUserEmailFromToken(token);
      const tk = cookies.token;
      console.log("User Email:", userEmail);
      console.log("Token:", tk);
  
      const response = await axios.get(`movies/liked-movies?email=${userEmail}`, {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });
  
      if (response.status !== 200) {
        throw new Error('Error fetching favorites');
      }
  
      console.log("Favorites Data:", response.data);
  
      setFavorites(response.data);
    } catch (error) {
      setError('Error fetching favorites. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  const isMovieInFavorites = (movieId) => {
    return favorites.some((favorite) => favorite.imdbId === movieId);
  };

  const toggleFavorite = async (movieId) => {
    setLoading(true);

    try {
      const userEmail = getUserEmailFromToken(cookies.token);
      const tk = cookies.token;

      if (isMovieInFavorites(movieId)) {
        const response = await axios.post(
          `movies/Fav/delete?movieId=${movieId}&email=${userEmail}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${tk}`
            }
          }
        );

        setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== movieId));
      } else {
        const response = await axios.post(
          `movies/addFav?email=${userEmail}&movieId=${movieId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${tk}`
            }
          }
        );

        setFavorites((prevFavorites) => [...prevFavorites, { id: movieId }]);
      }
      fetchFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
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

  const getMovieDetail = async (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  const renderRatingStars = (rating) => {
    const stars = [];

    for (let index = 0; index < 10; index++) {
      if (index < Math.floor(rating)) {
        stars.push(<FontAwesomeIcon key={index} icon={faStar} style={{ color: 'orange' }} />);
      } else if (index === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(<FontAwesomeIcon key={index} icon={faStarHalfAlt} style={{ color: 'orange' }} />);
      } else {
        stars.push(<FontAwesomeIcon key={index} icon={faStar} style={{ color: 'gray' }} />);
      }
    }

    return stars;
  }
  if (loading ) {
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
              src={movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : ''}
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
                icon={isMovieInFavorites(movie.id) ? faHeartCircleMinus : faHeartCirclePlus}
                onClick={() => toggleFavorite(movie.id)
                }
              />
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
