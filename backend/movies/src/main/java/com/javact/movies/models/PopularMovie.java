package com.javact.movies.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "popular_movie",  uniqueConstraints = {
        @UniqueConstraint(columnNames = {"imdb_id"})
})
public class PopularMovie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Long imdb_id;
    private String title;
    private String posterPath;
    private String ytTrailer;
}
