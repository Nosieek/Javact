package com.javact.movies.repositories;

import com.javact.movies.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> { //zmiana na integer
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(String email);
//    Optional<User> findByUsernameOrEmail(String username, String email);
    @Query("SELECT n FROM User n WHERE n.username = :username")
    Optional<User> findByUsername(String username);
//    Boolean existsByUsername(String username);
//    Boolean existsByEmail(String email);
}
