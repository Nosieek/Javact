import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import { faHeartCircleMinus, faHeartCirclePlus, faMagnifyingGlass, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';


const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation(); // Get the location object
  const queryParams = new URLSearchParams(location.search); // Parse the query parameters
  const searchText = queryParams.get("query"); // Get the 'query' parameter
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);


  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/api/movies/search?query=${searchText}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  };

  const getMovieDetail = async (movieId) => {
    navigate(`/movie/${movieId}`);
    console.log(movieId);
    };

  useEffect(() => {
    if (searchText) {
      handleSearch();
    }
  }, [searchText]);

  const getMovie = async (movieId) => {
    navigate(`/movie/${movieId}`);
    console.log(movieId);
    };

    const getUserEmailFromToken = (token) => {
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      return userEmail;
    };

  const addToFavorite = async (movieId) => {
    try {
      const userEmail = getUserEmailFromToken(cookies.token);
      const tk = cookies.token;
      console.log(movieId)
      const response = await axios.post(
        `http://localhost:8080/api/movies/addFav?email=${userEmail}&movieId=${movieId}`,
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


  return (
      <div className="container">
        
        <h1>Search {searchText}</h1>
      
    
        {searchResults.map((result) => (
          <div key={result.id} className="movie">
            <div className="left-column">
              <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w500${result.posterPath}`}
                alt={result.title}
              />
              <div className="movie-details">
                <h2 className="title">{result.title}</h2>
                <div className="overview">{result.overview}</div>
              </div>
            </div>
            <div className="right-column">
              <div className="play-button-icon-container">
                
                {cookies.token ? ( // Check if the user is logged in
                <>
                  <FontAwesomeIcon
                    className="top-icon"
                    icon={faHeartCirclePlus}
                    onClick={() => addToFavorite(result.id)}
                  />
                  <FontAwesomeIcon
                    className="top-icon"
                    icon={faMagnifyingGlass}
                    onClick={() => getMovie(result.id)}
                  />
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    className="top-icon"
                    icon={faHeartCirclePlus}
                    onClick={() => navigate('/Login')}                 
                 />
                  <FontAwesomeIcon
                    className="top-icon"
                    icon={faMagnifyingGlass}
                    onClick={() => navigate('/Login')}
                  />
                </>
              )}
              </div>
    
            </div>
          </div>
        ))}
      </div>
    );
    };
    
    export default SearchResults;
