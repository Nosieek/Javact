import './Hero.css'
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";

const Hero = ({movies}) => {
    return (
        <div className ='movie-carousel-container'>
          <Carousel>
            {
                movies?.map((movie) =>{
                    return(
                        <Paper key={movie.imdbId}>
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
                                            <Link to={`/Trailer/${movie.ytTrailer}`}>
                                                <div className="play-button-icon-container">
                                                    <FontAwesomeIcon className="play-button-icon"
                                                        icon = {faCirclePlay}/>
                                                </div>
                                            </Link>
                                            {/* <div className="movie-review-button-container">
                                            <Button variant ="info" onClick={() => reviews(??)} >Reviews</Button>
                                            </div> */}
                                        </div>
                                        
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