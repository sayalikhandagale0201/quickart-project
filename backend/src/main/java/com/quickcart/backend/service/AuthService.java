package com.quickcart.backend.service;

import com.quickcart.backend.dto.AuthResponse;
import com.quickcart.backend.dto.LoginRequest;
import com.quickcart.backend.dto.RegisterRequest;
import com.quickcart.backend.exception.AuthException;
import com.quickcart.backend.model.Role;
import com.quickcart.backend.model.User;
import com.quickcart.backend.repository.UserRepository;
import com.quickcart.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ================= REGISTER =================
    public AuthResponse register(RegisterRequest request) {

        if (request.getName() == null || request.getName().isBlank() ||
                request.getEmail() == null || request.getEmail().isBlank() ||
                request.getPassword() == null || request.getPassword().isBlank() ||
                request.getConfirmPassword() == null || request.getConfirmPassword().isBlank()) {

            throw new AuthException("All fields are required");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new AuthException("Password and confirm password do not match");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new AuthException("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER); // ✅ default role

        userRepository.save(user);

        return new AuthResponse(
                "Registration successful",
                null,
                null);
    }

    // ================= LOGIN =================
    public AuthResponse login(LoginRequest request) {

        if (request.getEmail() == null || request.getEmail().isBlank() ||
                request.getPassword() == null || request.getPassword().isBlank()) {

            throw new AuthException("Email and password are required");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(
                "Login successful",
                token,
                user // 🔥 MOST IMPORTANT LINE
        );
    }
}
