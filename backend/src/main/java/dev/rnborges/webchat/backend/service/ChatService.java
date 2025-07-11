package dev.rnborges.webchat.backend.service;

import dev.rnborges.webchat.backend.model.Chat;
import dev.rnborges.webchat.backend.model.Message;
import dev.rnborges.webchat.backend.repository.ChatRepository;
import dev.rnborges.webchat.backend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final MessageRepository messageRepository;
    private  final ChatRepository chatRepository;

    /**
     * Finds the message history for a specific chat, ordered by the most recent first.
     * This method leverages the pagination capabilities of Spring Data JPA.
     *
     * @param chatId The ID of the chat to retrieve messages from.
     * @param page   The page number to retrieve (0-indexed).
     * @param size   The number of messages per page.
     * @return A Page object containing the messages for the requested page and pagination metadata.
     */

    @Transactional(readOnly = true)
    public Page<Message> getChatHistory(UUID chatId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());

        return messageRepository.findByChatId(chatId, pageable);
    }

    /**
     * Finds all chats that a specific user is a member of.
     * @param userId The ID of the user.
     * @return A list of Chat entities.
     */
    @Transactional(readOnly = true)
    public List<Chat> getUserChats(UUID userId) {
        return chatRepository.findChatsByUserId(userId);
    }
}
