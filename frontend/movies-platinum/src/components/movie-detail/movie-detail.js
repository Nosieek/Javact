// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import { Container, Row, Col } from 'react-bootstrap';
// import './movie-detail.css';
// // import ReviewForm from '../reviewForm/ReviewForm';

// const MovieDetail = () => {
//   const { movieId } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [cookies, setCookies, removeCookies] = useCookies(['token']);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetchMovieDetails();
//   }, []);

//   const fetchMovieDetails = async () => {
//     console.log(movieId)

//     try {
//       const tk = cookies.token;
//       const response = await axios.get(`http://localhost:8080/api/movies/${movieId}`, {
//         headers: {
//           Authorization: `Bearer ${tk}`
//         }
//       });
//       setMovie(response.data);
//       console.log(movieId)
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching movie details:', error);
//       setLoading(false);
//     }
//   };

//   const addReview = async (e) => {
//     e.preventDefault();

//     const rev = revText.current;

//     try {
//       const response = await axios.post("/api/v1/reviews", {
//         reviewBody: rev.value,
//         imdbId: movieId
//       });

//       const updatedReviews = [...reviews, { body: rev.value }];

//       rev.value = "";

//       setReviews(updatedReviews);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!movie) {
//     return <div>No movie found.</div>;
//   }

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h3>{movie.title}</h3>
//         </Col>
//       </Row>
//       <Row className="mt-2">
//         <Col>
//           <img
//             className="movie-poster-container"
//             src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
//             alt={movie.title}
//           />
//         </Col>
//         <Col>
//           <>
//             <Row>
//               <Col>
//                 <h5>Release Date:</h5>
//                 {movie.releaseDate}
//                 <hr />
//                 <h5>Overview:</h5>
//                 {movie.overview}
//               </Col>
//             </Row>
//             <Row>
//               <Col>
//                 <hr />
//                 <h5>Vote Average:</h5>
//                 {movie.vote_average}
//                 <hr />
//               </Col>
//             </Row>
//           </>
//           <h3>Trailer</h3>
//           <div className="yt-video-container">
//             <iframe
//               className="yt-video"
//               title="Trailer"
//               width="560"
//               height="315"
//               src={`https://www.youtube.com/embed/${movie.ytTrailer}`}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <hr />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default MovieDetail;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import { Container, Row, Col } from 'react-bootstrap';
// import './movie-detail.css';

// const MovieDetail = () => {
//   const { movieId } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [cookies, setCookies, removeCookies] = useCookies(['token']);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetchMovieDetails();
//   }, []);

//   const fetchMovieDetails = async () => {
//     try {
//         console.log(movie.ytTrailer)

//       const tk = cookies.token;
//       const response = await axios.get(`http://localhost:8080/api/movies/${movieId}`, {
//         headers: {
//           Authorization: `Bearer ${tk}`
//         }
//       });
//       setMovie(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching movie details:', error);
//       setLoading(false);
//     }
//   };

//   const addReview = async (e) => {
//     e.preventDefault();

//     const rev = revText.current;

//     try {
//       const response = await axios.post("/api/v1/reviews", {
//         reviewBody: rev.value,
//         imdbId: movieId
//       });

//       const updatedReviews = [...reviews, { body: rev.value }];

//       rev.value = "";

//       setReviews(updatedReviews);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!movie) {
//     return <div>No movie found.</div>;
//   }

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h3>{movie.title}</h3>
//         </Col>
//       </Row>
//       <Row className="mt-2">
//         <Col>
//           <img
//             className="movie-poster"
//             src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
//             alt={movie.title}
//           />
//         </Col>
//         <Col>
//           <>
//             <Row>
//               <Col>
//                 <h5>Release Date:</h5>
//                 {movie.releaseDate}
//                 <hr />
//                 <h5>Overview:</h5>
//                 {movie.overview}
//               </Col>
//             </Row>
//             <Row>
//               <Col>
//                 <hr />
//                 <h5>Vote Average:</h5>
//                 {movie.vote_average}
//                 <hr />
//               </Col>
//             </Row>
//           </>
//           <h3>Trailer</h3>
//           <div className="yt-video-container">
//             <iframe
//               className="yt-video"
//               title="Trailer"
//               width="560"
//               height="315"
//               src={`https://www.youtube.com/embed/${movie.ytTrailer}`}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <hr />
//         </Col>
//       </Row>
//     </Container>
//   );
// };
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Container, Row, Col } from 'react-bootstrap';
import './movie-detail.css';
import NotFoundPage from '../404page/page404'
import ReviewForm from '../reviewForm/RevieForm';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['token']);
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    fetchMovieDetails();
    fetchMovieReview(); 
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      const tk = cookies.token;
      const response = await axios.get(`movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setLoading(false);
    }
  };

  const fetchMovieReview = async () => {
    try {
      const tk = cookies.token;
      const response = await axios.get(`review/movie-reviews?imdb=${movieId}`, {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      });
      setReviews(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setLoading(false);
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <NotFoundPage />; 
  }
  return (
    <Container>
            <Row>
        <Col>
          <h3>{movie.title}</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
          />
        </Col>
        <Col>
          <>
            <Row>
              <Col>
                <h5>Release Date:</h5>
                {movie.releaseDate}
                <hr />
                <h5>Overview:</h5>
                {movie.overview}
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
                <h5>Vote Average:</h5>
                {movie.vote_average}
                <hr />
              </Col>
            </Row>
          </>
          <h3>Trailer</h3>
          <div className="yt-video-container">
            <iframe
              className="yt-video"
              title="Trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movie.ytTrailer}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
        <h3>Review</h3>
        {reviews.length > 0 && (
          <>
            {reviews.map((review) => (
              <div key={review.id}>
                <p>Username: {review.username}</p>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
                <hr />
              </div>
            ))}
          </>
        )}
          <ReviewForm movieId={movieId}/> 
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
