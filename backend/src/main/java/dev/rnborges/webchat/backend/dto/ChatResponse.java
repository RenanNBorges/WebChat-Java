package dev.rnborges.webchat.backend.dto;

import dev.rnborges.webchat.backend.model.Chat;
import dev.rnborges.webchat.backend.model.User;
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

    /**
     * Construtor inteligente que formata a resposta do Chat.
     * Se o chat for privado, o nome será o do outro membro.
     * Se for em grupo, usará o nome do grupo.
     * @param chat A entidade Chat.
     * @param currentUser O utilizador que está a solicitar a lista de chats.
     * @return Um ChatResponse formatado.
     */
    public static ChatResponse fromEntity(Chat chat, User currentUser) {
        String chatName = chat.getName(); // Começa com o nome padrão

        if (!chat.isGroup()) {
            // Se for um chat privado, encontra o outro membro e usa o seu nome
            chatName = chat.getMembers().stream()
                    .filter(member -> !member.getUser().getId().equals(currentUser.getId()))
                    .findFirst()
                    .map(member -> member.getUser().getUsername())
                    .orElse("Conversa Removida"); // Fallback caso algo corra mal
        }

        return ChatResponse.builder()
                .id(chat.getId())
                .name(chatName)
                .isGroup(chat.isGroup())
                .createdAt(chat.getCreatedAt())
                .build();
    }
}