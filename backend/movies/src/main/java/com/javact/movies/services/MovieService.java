package com.javact.movies.services;

import com.javact.movies.dto.TmdbMovieDto;
import com.javact.movies.dto.TmdbResultsDto;
import com.javact.movies.dto.TmdbYouTubeDto;
import com.javact.movies.dto.TmdbYouTubeResultsDto;
import com.javact.movies.entity.User;
import com.javact.movies.models.Movie;
import com.javact.movies.repositories.MovieRepository;
import com.javact.movies.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    private UserRepository userRepository;
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
                .map(dto -> new Movie(dto.getId(),dto.getId(), dto.getTitle(), dto.getOverview(),
                        dto.getReleaseDate(), dto.getPosterPath(), getMovieYoutubeKey(dto.getId())))
                .collect(Collectors.toList());

        List<Movie> newMovies = new ArrayList<>();

        for (Movie movie : movies) {
            Optional<Movie> existingMovie = repository.findByTitle(movie.getTitle());//.orElse(null);
            if (!existingMovie.isPresent()) {
                repository.save(movie);
            } else {
                System.out.println("Film już istnieje w bazie danych: " + movie.getTitle());
                // Film już istnieje w bazie danych
                // Możesz tutaj obsłużyć ten przypadek np. rzucając wyjątek lub wykonując odpowiednie działania                // W tym przykładzie zignorujemy ponowne zapisywanie filmu                System.out.println("Film już istnieje w bazie danych: " + movie.getTitle());
            }

        }

        return movies;
    }
    public Movie getFilmById(Long id) {
        TmdbMovieDto dto = webClient.get()
                .uri("/movie/{id}?api_key={apiKey}", id, apiKey)
                .retrieve()
                .bodyToMono(TmdbMovieDto.class)
                .block();

        Movie movie = new Movie(dto.getId(),dto.getId(), dto.getTitle(), dto.getOverview(),
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

    public Movie addLikedMovieToUser(String userId, Long movieId) {
        System.out.println(userId +" ato id:" + movieId);
        Optional<Movie> optionalMovie = repository.findMovieByImdbId(movieId);
        Optional<User> optionalUser = userRepository.findByEmail(userId);

        if (optionalMovie.isPresent() && optionalUser.isPresent()) {
            Movie movie = optionalMovie.get();
            User user = optionalUser.get();
            user.getLikedMovies().add(movie);
            userRepository.save(user);
            return movie;
        } else {
            // Handle the case when either the movie or user is not found
            System.out.println(userId + " "+ movieId);
//            throw new NoSuchElementException("Movie or user not found");
            Movie movie = optionalMovie.get();

        }
        Movie movie = optionalMovie.get();

        return movie;
    }


    public List<Movie> getTopMoviesPolish(Long page) {
        TmdbResultsDto results = webClient.get()
                .uri("/movie/popular?api_key={apiKey}&page={page}", apiKey, page)
                .retrieve()
                .bodyToMono(TmdbResultsDto.class)
                .block();

        List<CompletableFuture<Movie>> movieFutures = results.getResults().stream()
                .map(dto -> CompletableFuture.supplyAsync(() -> {
                    String youtubeKey = getMovieYoutubeKey(dto.getId());
                    Movie movie = new Movie(dto.getId(), dto.getId(), dto.getTitle(), dto.getOverview(),
                            dto.getReleaseDate(), dto.getPosterPath(), youtubeKey);
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

}
