package com.javact.movies.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private String username;
    private int rating;
    private String comment;

    public ReviewDto(Long id, String username, int rating, String comment) {
        this.id = id;
        this.username = username;
        this.rating = rating;
        this.comment = comment;
    }
}
