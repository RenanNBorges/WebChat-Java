package dev.rnborges.webchat.backend.websocket;

import dev.rnborges.webchat.backend.model.MessageStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    /**
     * The ID of the chat room this message belongs to.
     * The ID of the user who sent the message.
     * The content of the message.
     */
    private UUID chatId;
    private UUID senderId;
    private String senderUsername;
    private String content;
    private MessageStatus status; // DELIVERED or READ
    private MessageType type;


}
