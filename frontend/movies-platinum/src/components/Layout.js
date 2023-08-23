// Layout.js
import React, { useState, useEffect } from 'react';
import Hero from './hero/Hero';
// import axios from 'axios';
import axios from '../api/axiosConfig';
import './Layout.css';

const Layout = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("movies/popular");
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Hero movies={movies} />
    </div>
  );
}

export default Layout;
