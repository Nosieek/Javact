package com.javact.movies.controllers;

import com.javact.movies.auth.ReviewRequest;
import com.javact.movies.dto.ReviewDto;
import com.javact.movies.models.Review;
import com.javact.movies.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
@RequestMapping("api/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @PostMapping("/add-review")
    public void test(@RequestBody ReviewRequest request) {
        reviewService.addReview(request);
    }
    @GetMapping("/movie-reviews")
    public ResponseEntity<List<ReviewDto>> getMovieReviews(@RequestParam Long imdb) {
        List<ReviewDto> reviewDTOs = reviewService.getMovieReview(imdb);
        return ResponseEntity.ok(reviewDTOs);
    }

    @PutMapping("/edit-review")
    public void edit(Long reviewId, @RequestBody ReviewRequest request) {
        reviewService.editReview(reviewId, request);
    }

    @DeleteMapping("/delete/{reviewId}")
    public void delete(@PathVariable Long reviewId) {

        reviewService.deleteReview(reviewId);
    }
}