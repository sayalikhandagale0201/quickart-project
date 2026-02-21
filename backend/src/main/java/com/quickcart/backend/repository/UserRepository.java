package com.quickcart.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickcart.backend.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
