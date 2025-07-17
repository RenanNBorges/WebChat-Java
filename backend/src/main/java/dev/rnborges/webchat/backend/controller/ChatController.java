package dev.rnborges.webchat.backend.controller;

import dev.rnborges.webchat.backend.dto.MessageResponse;
import dev.rnborges.webchat.backend.model.Message;
import dev.rnborges.webchat.backend.service.MessageService;
import dev.rnborges.webchat.backend.websocket.ChatMessage;
import dev.rnborges.webchat.backend.websocket.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        log.info("Received message: {}", chatMessage);

        Message savedMessage = messageService.saveMessage(chatMessage);

        MessageResponse messageResponse = MessageResponse.fromEntity(savedMessage);
        String destination = "/topic/chat/" + chatMessage.getChatId();
        log.info("A retransmitir a mensagem formatada para o destino: {}", destination);

        messagingTemplate.convertAndSend(destination, messageResponse);
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

        String destination = "/topic/chat/" + chatMessage.getChatId();
        messagingTemplate.convertAndSend(destination, chatMessage);
    }


}
