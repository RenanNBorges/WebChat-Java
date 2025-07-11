package dev.rnborges.webchat.backend.controller;

import dev.rnborges.webchat.backend.dto.UserResponse;
import dev.rnborges.webchat.backend.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    /**
     * Gets the profile of the currently authenticated user.
     * This endpoint is protected by our security configuration.
     * @param currentUser The User object, automatically injected by Spring Security from the JWT.
     * @return A ResponseEntity containing the user's public data.
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User currentUser) {
        log.info("Fetching profile for user: {}", currentUser.getUsername());
        return ResponseEntity.ok(UserResponse.fromEntity(currentUser));
    }

    // TODO: Add other user-related endpoints here in the future, like search users.
}