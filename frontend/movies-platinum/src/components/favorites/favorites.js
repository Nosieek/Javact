// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import jwtDecode from 'jwt-decode';
// import './favorites.css';

// const Favorites = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [cookies] = useCookies(['token']);

//   useEffect(() => {
//     fetchFavorites();
//   }, []);

//   const fetchFavorites = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = cookies.token;
//       const userEmail = getUserEmailFromToken(token);
//       const response = await axios.get(`http://localhost:8080/api/movies/liked-movies?email=${userEmail}`);

//       if (response.status !== 200) {
//         throw new Error('Error fetching favorites');
//       }

//       setFavorites(response.data);
//     } catch (error) {
//       setError('Error fetching favorites. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getUserEmailFromToken = (token) => {
//     const decodedToken = jwtDecode(token);
//     const userEmail = decodedToken.sub;
//     return userEmail;
//   };

//   const removeFromFavorites = async (movieId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/movies/favorites/${movieId}`);
//       setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
//     } catch (error) {
//       console.error('Error removing movie from favorites:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>My Favorites</h1>
//       {favorites.length === 0 ? (
//         <p>No favorites yet.</p>
//       ) : (
//         favorites.map((movie) => (
//           <div key={movie.id}>
//             <h2>{movie.title}</h2>
//             <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} />
//             <p>{movie.overview}</p>
//             <button onClick={() => removeFromFavorites(movie.id)}>Remove from Favorites</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Favorites;import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import './favorites.css';
import React, { useState,useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = cookies.token;
      const userEmail = getUserEmailFromToken(token);
      const response = await axios.get(`http://localhost:8080/api/movies/liked-movies?email=${userEmail}`);

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
      await axios.delete(`http://localhost:8080/api/movies/favorites/${movieId}`);
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
    <div className="favorites-container">
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((movie) => (
          <div className="movie" key={movie.id}>
            <img className="poster" src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} />
            <div className="movie-details">
              <h2>{movie.title}</h2>
              <button onClick={() => removeFromFavorites(movie.id)}>Remove from Favorites</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
