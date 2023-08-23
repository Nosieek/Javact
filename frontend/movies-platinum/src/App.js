// App.js
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Layout from './components/Layout';
import Trailer from './components/trailer/Trailer';
import NotFound from './components/notFound/NotFound';
import Login from './components/Login-registration/Login';
import TopRanked from './components/Top/TopRanked';
import Favorites from './components/favorites/favorites';
import MovieDetail from './components/movie-detail/movie-detail';
import SearchResults from './components/search/search-results';
import SessionTimeout from './components/SessionTime/SessionTimeout';
import { useCookies } from "react-cookie";
import React, { useState } from 'react';

function App() {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.token); 

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Header />
      {isLoggedIn && <SessionTimeout onTimeout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/Trailer/:ytTrailer" element={<Trailer />} />
        <Route path="/Top" element={<TopRanked />} />
        <Route path="/Fav" element={<Favorites />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
