package dev.rnborges.webchat.backend.controller;

import dev.rnborges.webchat.backend.dto.UserResponse;
import dev.rnborges.webchat.backend.model.User;
import dev.rnborges.webchat.backend.service.UserService; // Importa o nosso novo serviço
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor // <-- ESTA ANOTAÇÃO É CRUCIAL
@Slf4j
public class UserController {

    private final UserService userService;

    /**
     * Obtém o perfil do utilizador atualmente autenticado.
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User currentUser) {
        log.info("A obter o perfil para o utilizador: {}", currentUser.getUsername());
        return ResponseEntity.ok(UserResponse.fromEntity(currentUser));
    }

    /**
     * Endpoint para procurar utilizadores por nome de utilizador.
     */
    @GetMapping("/search")
    public ResponseEntity<List<UserResponse>> searchUsers(
            @RequestParam("q") String query,
            @AuthenticationPrincipal User currentUser) {
        log.info("Utilizador {} está a procurar por utilizadores com o termo: {}", currentUser.getUsername(), query);

        List<User> users = userService.searchUsers(query, currentUser.getId());

        List<UserResponse> userResponses = users.stream()
                .map(UserResponse::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userResponses);
    }
}