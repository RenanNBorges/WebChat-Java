package dev.rnborges.webchat.backend.controller;

import dev.rnborges.webchat.backend.dto.ChatResponse;
import dev.rnborges.webchat.backend.model.Chat;
import dev.rnborges.webchat.backend.model.User;
import dev.rnborges.webchat.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
@Slf4j
public class ChatRestController {
    private final ChatService chatService;

    /**
     * Fetches all chats (groups and private) for the currently authenticated user.
     * @param currentUser The currently authenticated user, injected by Spring.
     * @return A list of chats.
     */
    @GetMapping
    public ResponseEntity<List<ChatResponse>> getUserChats(@AuthenticationPrincipal User currentUser) {

        log.info("Fetching chats for users: {}", currentUser.getUsername());

        List<Chat> chats = chatService.getUserChats(currentUser.getId());

        List<ChatResponse> chatResponses = chats.stream()
                .map(ChatResponse::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(chatResponses);
    }
}
