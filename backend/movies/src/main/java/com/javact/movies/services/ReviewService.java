package com.javact.movies.services;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
import com.javact.movies.auth.ReviewRequest;
import com.javact.movies.dto.ReviewDto;
import com.javact.movies.models.Movie;
import com.javact.movies.models.Review;
import com.javact.movies.entity.User;
import com.javact.movies.repositories.MovieRepository;
import com.javact.movies.repositories.ReviewRepository;
import com.javact.movies.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

<<<<<<< Updated upstream
=======
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
//        Movie movie = movieRepository.findMovieByImdbId(movieId).orElse(null);
//
//        if (user != null || movie != null) {
//            Review review = new Review();
//            review.setUser(user);
//            review.setMovie(movie);
//            review.setRating(rating);
//            review.setComment(comment);
//            return reviewRepository.save(review);
//        }
//        return null;
//    }

>>>>>>> Stashed changes
    public List<ReviewDto> getMovieReview(Long movieId) {
        List<Review> reviews = reviewRepository.getMovieReview(movieId);
        return reviews.stream()
                .map(this::convertReviewToDTO)
                .collect(Collectors.toList());
    }

    public ReviewDto convertReviewToDTO(Review review) {
        return new ReviewDto(
                review.getId(),
                review.getUser().getUsername(),
                review.getRating(),
                review.getComment()
        );
    }
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository repository;
    public void addReview(ReviewRequest request) {
        System.out.println(request.getUserEmail());
        System.out.println(request.getMovieId());
        User user = userRepository.findByEmail(request.getUserEmail()).orElse(null);
        Movie movie = repository.findMovieByImdbId(request.getMovieId()).orElse(null);
        System.out.println("ponizej user");
        System.out.println(user == null);
        System.out.println("ponizej movie");
        System.out.println(movie == null);
        if (user != null && movie != null) {
            Review review = Review.builder()
                    .user(user)
                    .movie(movie)
                    .rating(request.getRating())
                    .comment(request.getComment())
                    .build();
            System.out.println("zapisuje");
            reviewRepository.save(review);
        }else {
            // For example:
            // throw new ReviewAlreadyExistsException("Review already exists for this user and movie");
        }
    }
}
