import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import axios from '../../api/axiosConfig';
import { faHeartCircleMinus, faHeartCirclePlus, faMagnifyingGlass, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { BeatLoader } from 'react-spinners'; 


const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const searchText = queryParams.get("query");
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try{
      const response = await axios.get(`movies/search?query=${searchText}`);
      if (response.status === 200) {
        setSearchResults(response.data);
        if(response.data.length === 0){
          setNotFound(true);
        }
        else{
          setNotFound(false);
        }
        console.log(response.data)
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




  if (loading) {
    return (
      <div className="container">
        <h1>Searching Movies</h1>
        <div className="loading">
          <BeatLoader color="#ffffff" loading={loading} size={15} />
        </div>
      </div>
    );
  }
  return (
  <div className="container">
        <h1>Search {searchText}</h1>
        {notFound && searchResults.length === 0 && (
          <p> Niestety nie zlaleźlismy tego co szukasz😥😥😥</p>
        )}

        {!notFound && (
          <>
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
                
                {cookies.token ? ( 
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
          </>
        )}
      </div>
    );
  };

export default SearchResults;