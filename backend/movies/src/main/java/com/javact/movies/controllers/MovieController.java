package com.javact.movies.controllers;

import com.javact.movies.models.Movie;
import com.javact.movies.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins ="http://localhost:3000")
@RequestMapping("api/movies")
public class MovieController {
    @Autowired
    private MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }
    
    @GetMapping("/popular")
    public List<Movie> getMovies() {
        return movieService.getPopularMovies();
    }
    @GetMapping("/watchlist")
    public List<Movie> watchList() {
        return movieService.getPopularMovies2();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Movie movie = movieService.getFilmById(id);
        if (movie != null) {
            return ResponseEntity.ok(movie);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    public void saveFilm(@RequestBody Movie film) {
        movieService.saveFilm(film);
    }
}
