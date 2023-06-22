import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import './TopRanked.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleMinus, faHeartCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar, faStarHalfAlt,} from '@fortawesome/free-solid-svg-icons';
import * as far from "@fortawesome/free-regular-svg-icons";

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Import jwt-decode library

const TopRanked = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();


  useEffect(() => {
    const token = cookies.token;
    if (!token) {
      navigate('/Login');
    }
    fetchMovies(currentPage);
  }, [currentPage],[cookies, navigate]);

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
      const response = await axios.get(`http://localhost:8080/api/movies/top?page=${page}`, {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });
      if (response.status !== 200) {
        // throw new Error('Error fetching movies\n' + response.status);
      }
      setMovies(response.data);
    } catch (error) {
      // setError('Error fetching movies. Please try again later.' + error);
    } finally {
      setLoading(false);
    }
  }


  const addToFavoritelist = async (movieId) => {
    try {
      const userEmail = getUserEmailFromToken(cookies.token);
      const tk = cookies.token;
    
      const response = await axios.post(`http://localhost:8080/api/movies/addFav?email=${userEmail}&movieId=${movieId}`, {},{
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });
    } catch (error) {
      console.error('Error adding movie to favoritelist:', error);
    }
  };
  
  const myFav = async () => {
    try {
      const userEmail = getUserEmailFromToken(cookies.token);
      const tk = cookies.token;
      const response = await axios.get(`http://localhost:8080/api/movies/liked-movies?email=${userEmail}`, {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });
      console.log(response.data); // Sprawdź, czy otrzymujesz poprawne dane z serwera
      return response.data;
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
      return []; // Zwróć pustą tablicę w przypadku błędu
    }
  };
  


  // const isMovieInFavorites = async (movieId) => {
  //   try {
  //     const favorites = await myFav();
  //     const movieIds = favorites.map((movie) => movie.id);
  //     console.log(movieIds.includes(movieId));
  //     return movieIds.includes(movieId);
  //   } catch (error) {
  //     console.error('Error checking if movie is in favorites:', error);
  //     return false; // Return false if an error occurs
  //   }
  // };
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
              <div className="overview">{movie.overview}</div>
              <div className="release-date">
              Rating: {movie.vote_average}/10 {renderRatingStars(movie.vote_average)}
              </div>
            </div>
          </div>
          <div className="right-column">
            <div className="play-button-icon-container">
                {/* <FontAwesomeIcon
                  className="play-button-icon"
                  icon={isMovieInFavorites(movie.id) ? faHeartCircleMinus: faHeartCirclePlus}
                  onClick={() => addToFavoritelist(movie.id)}
                /> */}
              <FontAwesomeIcon
                className="play-button-icon"
                icon={ faHeartCirclePlus }
                onClick={() => addToFavoritelist(movie.id)}
              />

            </div>
            
            {/* <div className="play-button-icon-container">
              <FontAwesomeIcon className="play-button-icon" icon={faMagnifyingGlass} />
            </div> */}
            {/* <div className="play-button-icon-container">
                <FontAwesomeIcon
                      className="play-button-icon"
                      icon={faHeartCirclePlus}
                      onClick={() => isMovieInFavorites(movie.id) ? faHeartCircleMinus: faHeartCirclePlus}
                    />
            </div> */}
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