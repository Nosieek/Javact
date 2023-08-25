package com.javact.movies.repositories;

import com.javact.movies.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie,Long> {
    @Query("SELECT t FROM Movie t WHERE t.title = :title")
    List<Movie> findByTitle(String title);
    @Query("SELECT m FROM Movie m WHERE m.imdb_id = :imdbId")
    Optional<Movie> findMovieByImdbId(@Param("imdbId") Long imdbId);
}
