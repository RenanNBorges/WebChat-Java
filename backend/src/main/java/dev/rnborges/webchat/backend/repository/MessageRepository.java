package dev.rnborges.webchat.backend.repository;

import dev.rnborges.webchat.backend.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

/**
 * Repositório para a entidade Message.
 */
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> { // Nota: O ID da mensagem é Long

    /**
     * Encontra todas as mensagens de um chat específico, de forma paginada.
     * O nome do parâmetro 'chatId' agora corresponde ao nome do método 'findByChatId'.
     *
     * @param chatId O UUID do Chat.
     * @param pageable As informações de paginação.
     * @return Uma página de Messages.
     */
    Page<Message> findByChatId(UUID chatId, Pageable pageable);
}