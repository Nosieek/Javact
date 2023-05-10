import './Hero.css'
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
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