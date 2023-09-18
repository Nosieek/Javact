package com.javact.movies.repositories;

import com.javact.movies.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT r FROM Review r WHERE r.movie.imdb_id = :imdb")
    List<Review> getMovieReview(Long imdb);
}
