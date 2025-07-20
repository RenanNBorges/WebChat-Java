package dev.rnborges.webchat.backend.service;

import dev.rnborges.webchat.backend.model.User;
import dev.rnborges.webchat.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * Serviço para encapsular a lógica de negócio relacionada com os utilizadores.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Procura por utilizadores com base num termo de pesquisa.
     * A pesquisa não é sensível a maiúsculas/minúsculas e exclui o próprio utilizador
     * que está a realizar a pesquisa.
     *
     * @param query O termo de pesquisa (deve ter pelo menos 2 caracteres).
     * @param selfId O UUID do utilizador a ser excluído dos resultados.
     * @return Uma lista de entidades User que correspondem à pesquisa, ou uma lista vazia.
     */
    @Transactional(readOnly = true)
    public List<User> searchUsers(String query, UUID selfId) {
        // Validação de negócio: retorna uma lista vazia se a pesquisa for inválida.
        if (query == null || query.trim().length() < 2) {
            return Collections.emptyList();
        }

        // Delega a chamada para o método otimizado do repositório.
        return userRepository.searchByUsernameContainingIgnoreCaseAndIdNot(query.trim(), selfId);
    }
}