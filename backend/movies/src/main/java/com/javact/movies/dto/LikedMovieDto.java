package com.javact.movies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LikedMovieDto {
    private Long id;
    private String title;
//    private String overview;
//    private String releaseDate;
    private String posterPath;
//    private String youtubeTrailer;
}
