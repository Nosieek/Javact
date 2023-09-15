package com.javact.movies.dto;

import lombok.Data;

import java.util.Calendar;
import java.util.Date;

@Data
public class ReviewDto {
    private Long id;
    private String email;
    private String username;
    private int rating;
    private String comment;
    private Date fullDate;

    public ReviewDto(Long id, String email,String username, int rating, String comment) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.rating = rating;
        this.comment = comment;
        Calendar calendar = Calendar.getInstance();
        this.fullDate = calendar.getTime();
    }
}
