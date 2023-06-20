package com.javact.movies.models;


import com.javact.movies.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Long imdb_id;
    private String title;

    public Long getImdb_id() {
        return imdb_id;
    }

    @Column(length = 1000)
    private String overview;

    public Movie(Long id, Long imdb_id, String title, String overview, String relaseDate, String posterPath, String ytTrailer) {
        this.id = id;
        this.imdb_id = imdb_id;
        this.title = title;
        this.overview = overview;
        this.relaseDate = relaseDate;
        this.posterPath = posterPath;
        this.ytTrailer = ytTrailer;
    }

    private String relaseDate;
    private String posterPath;
    private String ytTrailer;

    @ManyToMany(mappedBy = "likedMovies", fetch = FetchType.LAZY)
    private Set<User> likedByUsers;
}
