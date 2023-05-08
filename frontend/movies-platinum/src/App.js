import './App.css';
// import api from './api/axiosConfig';
import api from './api/axiosConfig';
import axios from 'axios';
import { Routes, Route} from 'react-router-dom';
import { useState, useEffect} from 'react';
import Home from './components/home/Home';
import Layout from './components/Layout';


function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();


  const getMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/movies/popular");
      console.log(response.data);
      setMovies(response.data); // assuming response contains the movie data as an array
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  },[])


  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home movies={movies}/>}></Route>

        </Route>
      </Routes>

    </div>
  );
}

export default App;
