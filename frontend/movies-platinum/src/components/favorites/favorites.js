import axios from 'axios';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import './favorites.css';
import { faHeartCircleMinus, faHeartCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';


const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['token']);


  useEffect(() => {
    fetchFavorites();
    const token = cookies.token;

    if (!token) {
      navigate('/Login');
    }
  }, [],[cookies, navigate]);

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = cookies.token;
      const userEmail = getUserEmailFromToken(token);
      const tk = cookies.token;
      const response = await axios.get(`http://localhost:8080/api/movies/liked-movies?email=${userEmail}`,{
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });

      if (response.status !== 200) {
        throw new Error('Error fetching favorites');
      }

      setFavorites(response.data);
    } catch (error) {
      setError('Error fetching favorites. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getUserEmailFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.sub;
    return userEmail;
  };

  const removeFromFavorites = async (movieId) => {
    try {
      const tk = cookies.token;
      await axios.delete(`http://localhost:8080/api/movies/favorites/${movieId}`, {}, {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });
      setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>
      <div className="favorites-container">
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map((movie) => (
            <div className="movie-container" key={movie.id}>
              <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} />
              <div className="movie-details">
                <h2 className="movie-titles">{movie.title}</h2>
                {/* <button className="remove-button" onClick={() => removeFromFavorites(movie.id)}>
                <FontAwesomeIcon icon={faHeartCircleMinus} /> */}
                <FontAwesomeIcon
                  className="heart-icon"
                  icon={faHeartCircleMinus}
                  onClick={() => removeFromFavorites(movie.id)}
                />
                <FontAwesomeIcon
                  className="heart-icon"
                  icon={faMagnifyingGlass}
                  onClick={() => removeFromFavorites(movie.id)}
                />

            {/* </button> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
