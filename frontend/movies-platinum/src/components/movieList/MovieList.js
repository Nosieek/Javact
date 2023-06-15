import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const MovieList = ({ movies }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const token = cookies.token;

    if (!token) {
      navigate('/Login');
    }
  }, [cookies, navigate]);

  if (!Array.isArray(movies)) {
    return <p>No movies available.</p>;
  }

  return (
    <div className="movies-all-card">
      {movies.map((movie) => (
        <div key={movie.id} className="movies-all-cards">
          <div className="movie-card-content">
            <div className="movie-image-wrapper">
              <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} />
            </div>

            <div className="movie-details">
              <h6 className="movie-titles">{movie.title}</h6>
              <p className="movie-description-full">{movie.overview}</p>

              <button className="add-button">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
