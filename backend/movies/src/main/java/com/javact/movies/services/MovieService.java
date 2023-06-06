package com.javact.movies.services;

import com.javact.movies.dto.TmdbMovieDto;
import com.javact.movies.dto.TmdbResultsDto;
import com.javact.movies.dto.TmdbYouTubeDto;
import com.javact.movies.dto.TmdbYouTubeResultsDto;
import com.javact.movies.models.Movie;
import com.javact.movies.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;
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

        List<Movie> movies = results.getResults().stream()
                .map(dto -> new Movie(dto.getId(), dto.getTitle(), dto.getOverview(),
                        dto.getReleaseDate(), dto.getPosterPath(), getMovieYoutubeKey(dto.getId())))
                .collect(Collectors.toList());

        return movies;
    }
    public Movie getFilmById(Long id) {
        TmdbMovieDto dto = webClient.get()
                .uri("/movie/{id}?api_key={apiKey}", id, apiKey)
                .retrieve()
                .bodyToMono(TmdbMovieDto.class)
                .block();

        Movie movie = new Movie(dto.getId(), dto.getTitle(), dto.getOverview(),
                dto.getReleaseDate(), dto.getPosterPath(), getMovieYoutubeKey(id));

        return movie;
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

    public void saveFilm(Movie movie) {
        repository.save(movie);
    }
}
