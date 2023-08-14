// Layout.js
import React, { useState, useEffect } from 'react';
import Hero from './hero/Hero';
import axios from 'axios';
import './Layout.css';

const Layout = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/movies/popular");
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
