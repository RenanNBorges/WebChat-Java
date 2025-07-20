package dev.rnborges.webchat.backend.controller;

import dev.rnborges.webchat.backend.dto.ChatRequest;
import dev.rnborges.webchat.backend.dto.ChatResponse;
import dev.rnborges.webchat.backend.model.Chat;
import dev.rnborges.webchat.backend.model.User;
import dev.rnborges.webchat.backend.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
@Slf4j
public class ChatRestController {
    private final ChatService chatService;

    /**
     * Creates a new chat (private or group).
     * @param chatRequest The request body containing the chat details.
     * @param currentUser The currently authenticated user, who will be the creator.
     * @return A response entity with the data of the newly created chat.
     */
    @PostMapping
    public ResponseEntity<ChatResponse> createChat(
            @Valid @RequestBody ChatRequest chatRequest,
            @AuthenticationPrincipal User currentUser
    ) {
        Chat createdChat = chatService.createChat(chatRequest, currentUser);
        log.info("User {} is creating a new chat with ID: {}", currentUser.getUsername(), createdChat.getId());
        return new ResponseEntity<>(ChatResponse.fromEntity(createdChat, currentUser), HttpStatus.CREATED);
    }

    /**
     * Fetches all chats (groups and private) for the currently authenticated user.
     * The name of private chats is dynamically set to the other participant's name.
     * @param currentUser The authenticated user, injected by Spring.
     * @return A list of formatted chats.
     */
    @GetMapping
    public ResponseEntity<List<ChatResponse>> getUserChats(@AuthenticationPrincipal User currentUser) {
        log.info("Fetching chats for user: {}", currentUser.getUsername());
        List<Chat> chats = chatService.getUserChats(currentUser.getId());
        List<ChatResponse> chatResponses = chats.stream()
                .map(chat -> ChatResponse.fromEntity(chat, currentUser))
                .collect(Collectors.toList());
        return ResponseEntity.ok(chatResponses);
    }

}