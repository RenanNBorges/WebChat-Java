package dev.rnborges.webchat.backend.controller;

import dev.rnborges.webchat.backend.dto.MessageResponse;
import dev.rnborges.webchat.backend.model.Message;
import dev.rnborges.webchat.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("api/messages")
@RequiredArgsConstructor
@Slf4j
public class MessageController {
    private final ChatService chatService;

    /**
     * Fetches the message history for a specific chat with pagination.
     * @param chatId The ID of the chat, passed as a request parameter.
     * @param page   The page number to retrieve (defaults to 0).
     * @param size   The number of messages per page (defaults to 50).
     * @return A paginated response of messages.
     */
    @GetMapping
    public ResponseEntity<Page<MessageResponse>> getChatMessages(
            @RequestParam("chatId") UUID chatId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size
    ) {
        log.info("Fetching message history for chat ID: {} with page: {} and size: {}", chatId, page, size);

        Page<Message> messagePage = chatService.getChatHistory(chatId, page, size);

        Page<MessageResponse> messageResponsePage = messagePage.map(MessageResponse::fromEntity);

        return ResponseEntity.ok(messageResponsePage);
    }
}
