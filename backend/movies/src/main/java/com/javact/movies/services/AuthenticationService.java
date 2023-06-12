package com.javact.movies.services;

import com.javact.movies.auth.AuthenticationRequest;
import com.javact.movies.auth.AuthenticationResponse;
import com.javact.movies.auth.RegisterRequest;
import com.javact.movies.entity.User;
import com.javact.movies.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder().build();
        try{
             user = User.builder()
                    .name(request.getName())
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .build();
             if(repository.findByEmail(request.getEmail()).isEmpty()){
                 repository.save(user);
                 var jwtToken = jwtService.generateToken(user);

                 return AuthenticationResponse.builder()
                         .token(jwtToken)
                         .build();
             }
            return AuthenticationResponse.builder().token(null).build();
        } catch (Exception ex) {
            return AuthenticationResponse.builder().token(null).build();
        }

    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));

        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
