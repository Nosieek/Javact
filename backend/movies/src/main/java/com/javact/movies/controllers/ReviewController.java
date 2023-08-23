//package com.javact.movies.controllers;
//
//import com.javact.movies.models.Review;
//import com.javact.movies.services.ReviewService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@CrossOrigin(origins ="http://localhost:3000")
//@RequestMapping("api/review")
//public class ReviewController {
//
//    @Autowired
//    private ReviewService reviewService;
//
//    @PostMapping("/add-review")
//    public ResponseEntity<Review> addReview(
//            @RequestParam String userEmail,
//            @RequestParam Long movieId,
//            @RequestParam int rating,
//            @RequestParam String comment
//    ) {
//        Review review = reviewService.addReview(userEmail, movieId, rating, comment);
//        if (review != null) {
//            return ResponseEntity.ok(review);
//        } else {
//            // Handle user or movie not found
//            return ResponseEntity.badRequest().build();
//        }
//    }
//}
