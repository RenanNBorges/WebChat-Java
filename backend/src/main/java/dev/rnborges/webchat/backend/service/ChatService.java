package dev.rnborges.webchat.backend.service;

import dev.rnborges.webchat.backend.dto.ChatRequest;
import dev.rnborges.webchat.backend.model.Chat;
import dev.rnborges.webchat.backend.model.ChatMember;
import dev.rnborges.webchat.backend.model.Message;
import dev.rnborges.webchat.backend.model.User;
import dev.rnborges.webchat.backend.repository.ChatMemberRepository;
import dev.rnborges.webchat.backend.repository.ChatRepository;
import dev.rnborges.webchat.backend.repository.MessageRepository;
import dev.rnborges.webchat.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final MessageRepository messageRepository;
    private  final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMemberRepository chatMemberRepository;

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

    /**
     * Creates a new chat with the given members.
     * @param createRequest The request DTO containing chat details.
     * @param creator The user who is creating the chat.
     * @return The newly created Chat entity.
     */
    @Transactional
    public Chat createChat(ChatRequest createRequest, User creator) {
        List<UUID> memberIds = new ArrayList<>(createRequest.getMemberIds());
        if (!memberIds.contains(creator.getId())) {
            memberIds.add(creator.getId());
        }

        List<User> members = userRepository.findAllById(memberIds);
        if(members.size() != memberIds.size()) {
            throw new IllegalArgumentException("Member Ids provide are invalid.");
        }

        // Create Chat entity
        Chat chat = Chat.builder()
                .name(createRequest.getName())
                .isGroup(createRequest.isGroup())
                .build();

        Chat savedChat = chatRepository.save(chat);

        // Create and save ChatMember entities
        List<ChatMember> chatMembers = members.stream()
                .map(member -> ChatMember.builder()
                        .chat(savedChat)
                        .user(member)
                        .isAdmin(member.getId().equals(creator.getId()))
                        .build())
                .collect(Collectors.toList());

 //       log.info("Creating a new chat, params:\nName: {}\nisGroup: {}",savedChat.getName(), savedChat.isGroup() );

        chatMemberRepository.saveAll(chatMembers);

        savedChat.setMembers(new HashSet<>(chatMembers));
        return savedChat;
    }
}
