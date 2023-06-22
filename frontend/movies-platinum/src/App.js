import './App.css';
// import api from './api/axiosConfig';
import api from './api/axiosConfig';
import axios from 'axios';
import { Routes, Route} from 'react-router-dom';
import { useState, useEffect} from 'react';
import Home from './components/home/Home';
import Layout from './components/Layout';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import NotFound from './components/notFound/NotFound';
import MovieList from './components/movieList/MovieList';
import Login from './components/Login-registration/Login';
import Register from './components/Login-registration/Register';
import TopRanked from './components/Top/TopRanked';
import Favorites from './components/favorites/favorites';

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();


  const getMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/movies/popular");
      console.log(response.data);
      setMovies(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  },[])


  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home movies={movies}/>}></Route>
          <Route path="/Trailer/:ytTrailer" element={<Trailer/>  }></Route>
          <Route path="/Top" element={<TopRanked />} />
          <Route path="/Fav" element={<Favorites />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/*" element={<NotFound/>  }></Route>

        </Route>
      </Routes>

    </div>
  );
}

export default App;
