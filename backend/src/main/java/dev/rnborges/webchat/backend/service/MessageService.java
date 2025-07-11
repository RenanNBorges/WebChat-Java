package dev.rnborges.webchat.backend.service;

import dev.rnborges.webchat.backend.model.Chat;
import dev.rnborges.webchat.backend.model.Message;
import dev.rnborges.webchat.backend.model.MessageStatus;
import dev.rnborges.webchat.backend.model.User;
import dev.rnborges.webchat.backend.repository.MessageRepository;
import dev.rnborges.webchat.backend.websocket.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    /**
     * Processes and saves a new chat message.
     * This method will be called from our WebSocket controller.
     *
     * @param chatMessage The WebSocket message DTO.
     * @param sender The authenticated user who sent the message.
     * @param chat The chat room entity this message belongs to.
     * @return The saved Message entity.
     */
    @Transactional(readOnly = true)
    public Message saveMessage(ChatMessage chatMessage, User sender, Chat chat) {
        boolean isMember = chat.getMembers().stream()
                .anyMatch(member -> member.getUser().getId()
                        .equals(
                                sender.getId()));

        if (!isMember) {
            throw new SecurityException("User is not a member of chat and cannot send messages.");
        }
        Message message = Message.builder()
                .chat(chat)
                .sender(sender)
                .content(chatMessage.getContent())
                .status(MessageStatus.DELIVERED)
                .build();

        return messageRepository.save(message);
    };
}
