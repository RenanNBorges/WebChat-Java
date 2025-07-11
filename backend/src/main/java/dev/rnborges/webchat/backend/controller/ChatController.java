package dev.rnborges.webchat.backend.controller;

import dev.rnborges.webchat.backend.dto.ChatResponse;
import dev.rnborges.webchat.backend.dto.MessageResponse;
import dev.rnborges.webchat.backend.model.Chat;
import dev.rnborges.webchat.backend.model.Message;
import dev.rnborges.webchat.backend.model.User;
import dev.rnborges.webchat.backend.repository.ChatRepository;
import dev.rnborges.webchat.backend.repository.UserRepository;
import dev.rnborges.webchat.backend.service.ChatService;
import dev.rnborges.webchat.backend.service.MessageService;
import dev.rnborges.webchat.backend.websocket.ChatMessage;
import dev.rnborges.webchat.backend.websocket.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final MessageService messageService;
    private final ChatRepository chatRepository;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Handles incoming chat messages from clients.
     * This method is mapped to the destination "/app/chat.sendMessage".
     *
     * @param chatMessage The message payload sent by the client.
     * @param principal   The authenticated user principal, injected by Spring Security.
     */
    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage, Principal principal) {
        log.info("Received message: {}", chatMessage);

        User sender = (User) ((Authentication) principal).getPrincipal();

        Chat chat = chatRepository.findById(chatMessage.getChatId())
                .orElseThrow(() -> new IllegalStateException("Chat with id " + chatMessage.getChatId() + " not found."));

        messageService.saveMessage(chatMessage, sender, chat);

        String destination = "/topic/chat" + chat.getId();

        messagingTemplate.convertAndSend(destination, chatMessage);

    }

    /**
     * Handles other WebSocket events, like a user joining a chat.
     * This method is mapped to the STOMP destination "/app/chat.addUser".
     *
     * @param chatMessage The message payload containing user and chat info.
     * @param principal   The currently authenticated user.
     */
    @MessageMapping("/chat.addUser")
    public void addUser(@Payload ChatMessage chatMessage, Principal principal) {
        log.info("User {} joined chat {}", principal.getName());

        chatMessage.setType(MessageType.JOIN);
        chatMessage.setContent(principal.getName() + " joined chat!");

        String destination = "/topic/chat" + chatMessage.getChatId();
        messagingTemplate.convertAndSend(destination, chatMessage);
    }


}
