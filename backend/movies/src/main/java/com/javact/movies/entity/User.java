package com.javact.movies.entity;

import com.javact.movies.models.Movie;
import lombok.*;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"}),
        @UniqueConstraint(columnNames = {"email"})
})
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String username;
    private String email;
    private String password;
    @ElementCollection(targetClass = Roles.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    private Set<Roles> roles;

    @ManyToMany
    @JoinTable(name = "liked_movies",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_imdb_id"))
    private Set<Movie> likedMovies = new HashSet<>();

    public void addLikedMovie(Movie movie) {
        likedMovies.add(movie);
        movie.getLikedByUsers().add(this); // co to tu robi?

    }


//    public void removeLikedMovie(Movie movie) {
//        likedMovies.remove(movie);
//        movie.getLikedByUsers().remove(this);
//    }
//    public List<Movie> getLikedMovies() {
//        return likedMovies.stream()
//                .collect(Collectors.toList());
//    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                ", likedMovies=" + likedMovies +
                '}';
    }
//    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @JoinTable(name = "user_roles",
//            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
//    private Set<Role> roles; // mozliwe do zmiany
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return roles.stream()
//                .map(role -> new SimpleGrantedAuthority(role.getName()))
//                .collect(Collectors.toSet());
//    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toSet());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}