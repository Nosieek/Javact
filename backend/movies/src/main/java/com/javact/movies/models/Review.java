package com.javact.movies.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.javact.movies.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Calendar;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    @JsonBackReference
    private Movie movie;
    private int rating;

    @Column(length = 1000)
    private String comment;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fullDate;

    // Dodajemy konstruktor, który inicjalizuje pole fullDate
    public Review(User user, Movie movie, int rating, String comment) {
        this.user = user;
        this.movie = movie;
        this.rating = rating;
        this.comment = comment;
        this.fullDate = Calendar.getInstance().getTime();
    }
}