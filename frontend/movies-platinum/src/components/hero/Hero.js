import './Hero.css'
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import { faHeartCircleMinus, faHeartCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import axios from '../../api/axiosConfig';

const Hero = ({movies}) => {
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

    const getUserEmailFromToken = (token) => {
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.sub;
        return userEmail;
      };
  
    const addToFavorite = async (movie) => {
      try {
        const userEmail = getUserEmailFromToken(cookies.token);
        const tk = cookies.token;
        console.log(movie.title)
        console.log(movie.imdb_id)

        const response = await axios.post(
          `movies/addFav?email=${userEmail}&movieId=${movie.imdb_id}`,
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

    const getMovieDetail = async (movie) => {
      console.log(movie.imdb_id)
      navigate(`/movie/${movie.imdb_id}`);
      console.log("CZEMU ", movie.title);
      };
  
    return (
        <div className ='movie-carousel-container'>
          <Carousel>
            {
                movies?.map((movie) =>{
                    return(
                        <Paper key={movie.id}>
                            <div className = 'movie-card-container'>
                                <div className="movie-card" style={{"--img": `url(https://image.tmdb.org/t/p/original${movie.posterPath})`}}>
                                    <div className="movie-detail">
                                        <div className="movie-poster">
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} />
                                        </div>

                                        <div className="movie-title">
                                            {movie.title}
                                        </div>

                                        <div className="movie-buttons-container">
                                        {cookies.token ? ( 
                                            <>
                                            <Link to={`/Trailer/${movie.ytTrailer}`}>
                                                <div className="play-button-icon-container">
                                                    <FontAwesomeIcon className="play-button-icon"
                                                        icon = {faCirclePlay}/>
                                                </div>

                                             </Link>
                                             {/* <div className="play-button-icon-container2">
                                             <FontAwesomeIcon
                                                        className="heart-icon-hero"
                                                        icon={faMagnifyingGlass}
                                                        onClick={() => getMovieDetail(movie)}
                                                    />
                                            </div> */}
                                            <div className="play-button-icon-container2">
                                             <FontAwesomeIcon
                                                        className="heart-icon-hero"
                                                        icon={faHeartCirclePlus}
                                                        onClick={() => addToFavorite(movie)}
                                                    />
                                            </div>
                                            </>
                                        ):(
                                            <Link to={`/Trailer/${movie.ytTrailer}`}>
                                                <div className="play-button-icon-container">
                                                    <FontAwesomeIcon className="play-button-icon"
                                                        icon = {faCirclePlay}/>
                                                </div>

                                             </Link>
                                        )}

                                                </div>
                                            {/* <div className="movie-review-button-container">
                                            <Button variant ="info" onClick={() => reviews(??)} >Reviews</Button>
                                            </div> */}
                                        </div>
                                        
                                    </div>
                                </div>
                        </Paper>
                    )
                })
            }
          </Carousel>
        </div>
      )
}

export default Hero