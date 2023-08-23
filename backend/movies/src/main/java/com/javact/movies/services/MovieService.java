package com.javact.movies.services;

import com.javact.movies.dto.*;
import com.javact.movies.entity.User;
import com.javact.movies.models.Movie;
import com.javact.movies.repositories.MovieRepository;
import com.javact.movies.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    @Autowired

    private UserRepository userRepository;
    @Value("${tmdb.api.key}")
    private String apiKey;

    @Autowired
    private WebClient webClient;

    private void saveData(Movie movie){
        Optional<Movie> existingMovie = repository.findByTitle(movie.getTitle());
        if (!existingMovie.isPresent()) {
            repository.save(movie);
        } else {
            System.out.println("Movie " + movie.getTitle() + "already exists!");
        }
    }

    public List<Movie> getPopularMovies() {
        TmdbResultsDto results = webClient.get()
                .uri("/movie/popular?api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(TmdbResultsDto.class)
                .block();


        List<Movie> movies = results.getResults().stream()
                .map(dto -> {
                    Movie movie = new Movie();
                    movie.setId(dto.getId());
                    movie.setImdb_id(dto.getId());
                    movie.setTitle(dto.getTitle());
                    movie.setOverview(dto.getOverview());
                    movie.setRelaseDate(dto.getReleaseDate());
                    movie.setPosterPath(dto.getPosterPath());
                    movie.setYtTrailer(getMovieYoutubeKey(dto.getId()));
                    movie.setVote_average(dto.getVoteAverage());
                    saveData(movie);
                    return movie;
                })
                .collect(Collectors.toList());

        return movies;
    }
    public Movie getFilmById(Long id) {
        Movie movie = new Movie();

        try {
            TmdbMovieDto dto = webClient.get()
                    .uri("/movie/{id}?api_key={apiKey}", id, apiKey)
                    .retrieve()
                    .bodyToMono(TmdbMovieDto.class)
                    .block();

            movie.setId(dto.getId());
            movie.setImdb_id(dto.getId());
            movie.setTitle(dto.getTitle());
            movie.setOverview(dto.getOverview());
            movie.setRelaseDate(dto.getReleaseDate());
            movie.setPosterPath(dto.getPosterPath());
            movie.setYtTrailer(getMovieYoutubeKey(id));
            movie.setVote_average(dto.getVoteAverage());

            saveData(movie);
            return movie;
        } catch (Exception notFoundException) {
            return null;
        }
    }

    private String getMovieYoutubeKey(Long id) {
        TmdbYouTubeDto results = webClient.get()
                .uri("/movie/{id}/videos?api_key={apiKey}", id, apiKey)
                .retrieve()
                .bodyToMono(TmdbYouTubeDto.class)
                .block();


        return results.getResults().stream()
                .filter(movie -> movie.getName().equals("Official Trailer"))
                .map(TmdbYouTubeResultsDto::getKey)
                .findFirst()
                .orElseGet(() ->
                        results.getResults().stream()
                                .filter(movie -> movie.getType().equals("Trailer"))
                                .map(TmdbYouTubeResultsDto::getKey)
                                .findFirst()
                                .orElse(null)
                );
    }
    public List<Movie> getTopMoviesPolish(Long page) {
        TmdbResultsDto results = webClient.get()
                .uri("/movie/top_rated?api_key={apiKey}&page={page}", apiKey, page)
                .retrieve()
                .bodyToMono(TmdbResultsDto.class)
                .block();

        List<CompletableFuture<Movie>> movieFutures = results.getResults().stream()
                .map(dto -> CompletableFuture.supplyAsync(() -> {
                    Movie movie = new Movie();
                    movie.setId(dto.getId());
                    movie.setImdb_id(dto.getId());
                    movie.setTitle(dto.getTitle());
                    movie.setOverview(dto.getOverview());
                    movie.setRelaseDate(dto.getReleaseDate());
                    movie.setPosterPath(dto.getPosterPath());
                    movie.setYtTrailer(getMovieYoutubeKey(dto.getId()));
                    movie.setVote_average(dto.getVoteAverage());
                    saveData(movie);
                    return movie;
                }))
                .collect(Collectors.toList());

        CompletableFuture<Void> allFutures = CompletableFuture.allOf(movieFutures.toArray(new CompletableFuture[0]));

        CompletableFuture<List<Movie>> allMoviesFuture = allFutures.thenApply(v ->
                movieFutures.stream()
                        .map(CompletableFuture::join)
                        .collect(Collectors.toList()));

        return allMoviesFuture.join();
    }
    public void addLikedMovieToUser(String userId, Long movieId) {
        Optional<Movie> optionalMovie = repository.findMovieByImdbId(movieId);
        Optional<User> optionalUser = userRepository.findByEmail(userId);

        if (optionalMovie.isPresent() && optionalUser.isPresent()) {
            Movie movie = optionalMovie.get();
            User user = optionalUser.get();
            user.addLikedMovie(movie);
            userRepository.save(user);
        } else {
            System.out.println("USER or Movie not found");
        }

    }

    public List<LikedMovieDto> getLikedMoviesForUser(String userId) {
        Optional<User> optionalUser = userRepository.findByEmail(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Long> movieIds = new ArrayList<>();

            for (Movie movie : user.getLikedMovies()) {
                Long id = movie.getImdb_id();
                movieIds.add(id);
            }

            List<LikedMovieDto> movies = new ArrayList<>();

            for (Long movieId : movieIds) {
                Optional<Movie> optionalMovie = repository.findMovieByImdbId(movieId);
                optionalMovie.ifPresent(movie -> {
                    LikedMovieDto movieDto = new LikedMovieDto(
                            movie.getId(),
                            movie.getImdb_id(),
                            movie.getTitle(),
                            movie.getPosterPath()
                    );
                    movies.add(movieDto);
                });
            }

            return movies;
        } else {
            throw new NoSuchElementException("User not found");
        }
    }

    public void removeFromFavorites(Long movieId, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<Movie> optionalMovie = repository.findById(movieId);

            if (optionalMovie.isPresent()) {
                Movie movie = optionalMovie.get();
                user.removeLikedMovie(movie);
                userRepository.save(user);
            } else {
                throw new NoSuchElementException("Movie not found");
            }
        } else {
            throw new NoSuchElementException("User not found");
        }
    }
    public List<Movie> searchMovies(String query) {
        System.out.println("Executing searchMovies with query: " + query);
        TmdbResultsDto results = webClient.get()
                .uri("/search/movie?api_key={apiKey}&query={query}", apiKey, query)
                .retrieve()
                .bodyToMono(TmdbResultsDto.class)
                .block();

        System.out.println("Retrieved results: " + results);//del

        List<Movie> movies = results.getResults().stream()
                .map(dto -> {
                    Movie movie = new Movie();
                    movie.setId(dto.getId());
                    movie.setImdb_id(dto.getId());
                    movie.setTitle(dto.getTitle());
                    movie.setOverview(dto.getOverview());
                    movie.setRelaseDate(dto.getReleaseDate());
                    movie.setPosterPath(dto.getPosterPath());
                    movie.setYtTrailer(getMovieYoutubeKey(dto.getId()));
                    movie.setVote_average(dto.getVoteAverage());
                    saveData(movie);
                    return movie;
                })
                .collect(Collectors.toList());
        return movies;
    }
}
