package com.javact.movies.controllers;

import com.javact.movies.auth.AuthenticationRequest;
import com.javact.movies.auth.AuthenticationResponse;
import com.javact.movies.auth.RegisterRequest;
import com.javact.movies.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (@RequestBody RegisterRequest request){
        AuthenticationResponse registrationResponse = service.register(request);

        if (registrationResponse.getToken() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(registrationResponse);

        }

        return ResponseEntity.ok(registrationResponse);

    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register (@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }
}