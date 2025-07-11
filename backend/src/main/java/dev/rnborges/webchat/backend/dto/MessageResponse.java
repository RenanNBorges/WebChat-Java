package dev.rnborges.webchat.backend.dto;

import dev.rnborges.webchat.backend.model.Message;
import dev.rnborges.webchat.backend.model.MessageStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MessageResponse {
    private Long id;
    private String content;
    private UserResponse sender;
    private LocalDateTime timestamp;
    private MessageStatus status;

    public static MessageResponse fromEntity(Message message) {
        return MessageResponse.builder()
                .id(message.getId())
                .content(message.getContent())
                .sender(UserResponse.fromEntity(message.getSender()))
                .timestamp(message.getTimestamp())
                .status(message.getStatus())
                .build();
    }
}
