package dev.rnborges.webchat.backend.service;

import dev.rnborges.webchat.backend.model.Chat;
import dev.rnborges.webchat.backend.model.Message;
import dev.rnborges.webchat.backend.model.MessageStatus;
import dev.rnborges.webchat.backend.model.User;
import dev.rnborges.webchat.backend.repository.ChatRepository;
import dev.rnborges.webchat.backend.repository.MessageRepository;
import dev.rnborges.webchat.backend.repository.UserRepository;
import dev.rnborges.webchat.backend.websocket.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;

    /**
     * Processa, valida e salva uma nova mensagem de chat.
     * Agora este método orquestra toda a operação.
     * @param chatMessage O DTO da mensagem vindo do WebSocket.
     * @return A entidade Message que foi salva.
     */
    @Transactional
    public Message saveMessage(ChatMessage chatMessage) {
        User sender = userRepository.findById(chatMessage.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("Utilizador remetente não encontrado."));

        Chat chat = chatRepository.findById(chatMessage.getChatId())
                .orElseThrow(() -> new IllegalArgumentException("Chat não encontrado."));

        boolean isMember = chat.getMembers().stream()
                .anyMatch(member -> member.getUser().getId().equals(sender.getId()));

        if (!isMember) {
            throw new SecurityException("O utilizador não é membro deste chat e não pode enviar mensagens.");
        }

        Message message = Message.builder()
                .chat(chat)
                .sender(sender)
                .content(chatMessage.getContent())
                .status(MessageStatus.DELIVERED)
                .build();

        return messageRepository.save(message);
    }
}