package com.javact.movies.models;


import com.javact.movies.dto.TmdbResultsDto;
import com.javact.movies.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movie", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"imdb_id"})
})
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Long imdb_id;
    private String title;
    @Column(length = 1000)
    private String overview;
    private String relaseDate;
    private String posterPath;
    private String ytTrailer;
    private Float vote_average;

    @ManyToMany(mappedBy = "likedMovies", fetch = FetchType.LAZY)
    private Set<User> likedByUsers;

    @OneToMany(mappedBy = "movie")
    private Set<Review> reviews = new HashSet<>();


}
