package dev.rnborges.webchat.backend.repository;

import model.Chat;
import model.Message;
import model.User;
import model.UserStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import repository.ChatRepository;
import repository.MessageRepository;
import repository.UserRepository;

import java.util.Comparator;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@DisplayName("Testes do Repositório de Mensagem")
public class MessageRepositoryTest {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRepository chatRepository;

    private Chat chat;

    @BeforeEach
    void setup() {
        User user = userRepository.save(User.builder().username("testuser").email("user@test.com").password("123").status(UserStatus.ONLINE).build());
        chat = chatRepository.save(Chat.builder().isGroup(false).build());

        // Criamos 3 mensagens para o mesmo chat
        messageRepository.save(Message.builder().chat(chat).sender(user).content("Primeira mensagem").build());
        // Adicionamos um pequeno delay para garantir timestamps diferentes, embora o Hibernate gerencie isso.
        try { Thread.sleep(10); } catch (InterruptedException ignored) {}
        messageRepository.save(Message.builder().chat(chat).sender(user).content("Segunda mensagem").build());
        try { Thread.sleep(10); } catch (InterruptedException e) {}
        messageRepository.save(Message.builder().chat(chat).sender(user).content("Terceira mensagem").build());
    }

    @Test
    @DisplayName("Deve retornar mensagens de forma paginada")
    void deveRetornarMensagensPaginadas() {
        // Arrange: Queremos a primeira página (página 0), com 2 itens
        Pageable pageable = PageRequest.of(0, 2);

        // Act
        Page<Message> resultPage = messageRepository.findByChatId(chat.getId(), pageable);

        // Assert
        assertThat(resultPage).isNotNull();
        assertThat(resultPage.getTotalElements()).isEqualTo(3); // Total de mensagens no chat
        assertThat(resultPage.getTotalPages()).isEqualTo(2);    // Total de páginas (3 itens / 2 por página)
        assertThat(resultPage.getContent()).hasSize(2);          // Itens na página atual
    }

    @Test
    @DisplayName("Deve retornar mensagens ordenadas por data de envio decrescente")
    void deveRetornarMensagensOrdenadasPorDataDesc() {
        // Arrange: Queremos todos os 3 itens, ordenados por 'sentAt' de forma decrescente
        Pageable pageable = PageRequest.of(0, 3, Sort.by("sentAt").descending());

        // Act
        Page<Message> resultPage = messageRepository.findByChatId(chat.getId(), pageable);

        // Assert
        assertThat(resultPage.getContent()).hasSize(3);
        // Verifica se a lista de mensagens está de fato ordenada pela data de envio em ordem reversa
        assertThat(resultPage.getContent()).isSortedAccordingTo(Comparator.comparing(Message::getTimestamp).reversed());
        assertThat(resultPage.getContent().get(0).getContent()).isEqualTo("Terceira mensagem");
    }
}