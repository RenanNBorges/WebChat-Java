package dev.rnborges.webchat.backend.repository;

import model.Chat;
import model.ChatMember;
import model.User;
import model.UserStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import repository.ChatMemberRepository;
import repository.ChatRepository;
import repository.UserRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@DisplayName("Testes do Repositório de Chat")
public class ChatRepositoryTest {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatMemberRepository chatMemberRepository;

    private User user1;
    private User user2;
    private Chat chat;

    @BeforeEach
    void setup() {
        // 1. Cenário (Arrange): Preparamos os dados no banco de dados em memória.
        user1 = userRepository.save(User.builder().username("alice").email("alice@test.com").password("pwd123").status(UserStatus.ONLINE).build());
        user2 = userRepository.save(User.builder().username("bob").email("bob@test.com").password("pwd123").status(UserStatus.OFFLINE).build());

        chat = chatRepository.save(Chat.builder().isGroup(true).name("Grupo de Teste").build());

        // Adicionamos os dois usuários como membros do mesmo chat.
        chatMemberRepository.save(ChatMember.builder().chat(chat).user(user1).isAdmin(true).build());
        chatMemberRepository.save(ChatMember.builder().chat(chat).user(user2).isAdmin(false).build());
    }

    @Test
    @DisplayName("Deve encontrar os chats de um usuário pelo seu ID")
    void deveEncontrarChatsPeloUserId() {
        // 2. Ação (Act): Executamos o método a ser testado para cada usuário.
        List<Chat> chatsDoUser1 = chatRepository.findChatsByUserId(user1.getId());

        // 3. Verificação (Assert): Validamos se o resultado está correto.
        assertThat(chatsDoUser1)
                .isNotNull()
                .isNotEmpty()
                .hasSize(1);

        assertThat(chatsDoUser1.get(0).getId()).isEqualTo(chat.getId());
        assertThat(chatsDoUser1.get(0).getName()).isEqualTo("Grupo de Teste");
    }
}