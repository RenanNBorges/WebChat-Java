package dev.rnborges.webchat.backend.controller;

import dev.rnborges.webchat.backend.dto.LoginRequest;
import dev.rnborges.webchat.backend.dto.RegisterRequest;
import dev.rnborges.webchat.backend.dto.UserResponse;
import dev.rnborges.webchat.backend.model.User;
import dev.rnborges.webchat.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService authService;

    /**
     * Handles the user registration request.
     * @param request The registration data containing username, email, and password.
     * @return A response entity with the created user's data (without the password).
     */
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request
                                                 ) {
        User newUser = authService.register(request);

        return ResponseEntity.ok(UserResponse.fromEntity(newUser));
    }

    /**
     * Handles the user login request.
     * @param request The login data containing username and password.
     * @return A response entity containing the JWT access token.
     */

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        String token = authService.login(request);
        return ResponseEntity.ok(Map.of("token", token));
    }
}


