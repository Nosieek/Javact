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

//    Calendar calendar = Calendar.getInstance();
//
//    @Temporal(TemporalType.TIMESTAMP) // Adnotacja określająca typ daty i czasu
//    private Date fullDate = calendar.getTime();
}