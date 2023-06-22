package com.javact.movies.controllers;

import com.javact.movies.dto.LikedMovieDto;
import com.javact.movies.entity.User;
import com.javact.movies.models.Movie;
import com.javact.movies.services.MovieService;
import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
//    @GetMapping("/top")
//    public List<Movie> top(@RequestParam(defaultValue = "1")Long page) {
//        return movieService.getTopMoviesPolish(page);
//    }
    @GetMapping("/top")
    public List<Movie> top(Long page) {
        return movieService.getTopMoviesPolish(page);
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

    @DeleteMapping("/favorites/{movieId}")
    public void removeFromFavorites(@PathVariable Long movieId) {
        movieService.removeFromFavorites(movieId);
    }
//    @GetMapping("/check")
//    public Boolean checkIfMovieInFavorites(@RequestParam String email,@RequestParam Long movieId) {
//        boolean isMovieInFavorites = movieService.isMovieInFavorites(email, movieId);
//        return isMovieInFavorites;
//    }
}
