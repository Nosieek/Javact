package com.javact.movies.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class TmdbYouTubeDto {
    private Long id;
    private List<TmdbYouTubeResultsDto> results;

}
