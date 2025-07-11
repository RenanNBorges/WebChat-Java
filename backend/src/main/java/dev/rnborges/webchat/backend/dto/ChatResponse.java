package dev.rnborges.webchat.backend.dto;


import dev.rnborges.webchat.backend.model.Chat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ChatResponse {
    private UUID id;
    private String name;
    private boolean isGroup;
    private LocalDateTime createdAt;

    public static ChatResponse fromEntity(Chat chat) {
        return ChatResponse.builder()
                .id(chat.getId())
                .name(chat.getName())
                .isGroup(chat.isGroup())
                .createdAt(chat.getCreatedAt())
                .build();
    }
}
