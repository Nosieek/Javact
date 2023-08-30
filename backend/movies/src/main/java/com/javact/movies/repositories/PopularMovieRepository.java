package com.javact.movies.repositories;

import com.javact.movies.models.Movie;
import com.javact.movies.models.PopularMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PopularMovieRepository extends JpaRepository<PopularMovie,Long> {
    @Query("SELECT m FROM Movie m WHERE m.imdb_id = :imdbId")
    Optional<PopularMovie> findMovieByImdbId(@Param("imdbId") Long imdbId);
}
