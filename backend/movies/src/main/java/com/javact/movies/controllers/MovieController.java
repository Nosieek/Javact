package com.javact.movies.controllers;
import com.javact.movies.dto.LikedMovieDto;
import com.javact.movies.models.Movie;
import com.javact.movies.models.PopularMovie;
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
    public List<PopularMovie> getMovies() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/top")
    public List<Movie> top(Long page) {
        return movieService.getTopMovies(page);
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

    @GetMapping("/liked-movies")
    public List<LikedMovieDto> getLikedMovies(@RequestParam String email) {
        return movieService.getLikedMoviesForUser(email);
    }

    @PostMapping("/addFav")
    public void addLikedMovieToUser(@RequestParam String email, @RequestParam Long movieId) {
        movieService.addLikedMovieToUser(email, movieId);
    }
    @PostMapping("/Fav/delete")
    public void removeFromFavorites(@RequestParam Long movieId, @RequestParam String email) {
        movieService.removeFromFavorites(movieId, email);
    }

    @GetMapping("/search")
    public List<Movie> getSearchMovies(@RequestParam String query) {
        return movieService.searchMovies(query);
    }

}
