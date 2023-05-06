package com.javact.movies.services;

import com.javact.movies.dto.TmdbMovieDto;
import com.javact.movies.dto.TmdbResultsDto;
import com.javact.movies.models.Movie;
import com.javact.movies.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Autowired
    private WebClient webClient;
    public List<Movie> findAllMovies(){
        return repository.findAll();
    }

    public List<Movie> getPopularMovies() {
        TmdbResultsDto results = webClient.get()
                .uri("/movie/popular?api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(TmdbResultsDto.class)
                .block();

        List<Movie> films = results.getResults().stream()
                .map(dto -> new Movie(dto.getId(), dto.getTitle(), dto.getOverview(), dto.getReleaseDate(), dto.getPosterPath()))
                .collect(Collectors.toList());

        return films;
    }
    public Movie getFilmById(Long id) {
        // implementacja pobierania filmu z TMDb API
        TmdbMovieDto dto = webClient.get()
                .uri("/movie/{id}?api_key={apiKey}", id, apiKey)
                .retrieve()
                .bodyToMono(TmdbMovieDto.class)
                .block();

        System.out.println(dto.getTitle());

        Movie film = new Movie(dto.getId(), dto.getTitle(), dto.getOverview(), dto.getReleaseDate(), dto.getPosterPath());
        repository.save(film);
        return film;
    }

    public void saveFilm(Movie movie) {
        repository.save(movie);
    }
}
