//package com.javact.movies.services;
//import com.javact.movies.models.Movie;
//import com.javact.movies.models.Review;
//import com.javact.movies.entity.User;
//import com.javact.movies.repositories.MovieRepository;
//import com.javact.movies.repositories.ReviewRepository;
//import com.javact.movies.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class ReviewService {
//
//    @Autowired
//    private ReviewRepository reviewRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private MovieRepository movieRepository;
//
//    public Review addReview(String userEmail, Long movieId, int rating, String comment) {
//        User user = userRepository.findByEmail(userEmail).orElse(null);
//        Movie movie = movieRepository.findById(movieId).orElse(null);
//
//        if (user == null || movie == null) {
//            // Handle user or movie not found
//            return null;
//        }
//
//        Review review = new Review();
//        review.setUser(user);
//        review.setMovie(movie);
//        review.setRating(rating);
//        review.setComment(comment);
//
//        return reviewRepository.save(review);
//    }
//}
