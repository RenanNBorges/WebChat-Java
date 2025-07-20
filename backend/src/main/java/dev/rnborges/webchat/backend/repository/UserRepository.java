package dev.rnborges.webchat.backend.repository;

import dev.rnborges.webchat.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para a entidade User, utilizando Spring Data JPA.
 * Fornece métodos para operações CRUD e consultas personalizadas na tabela de utilizadores.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    /**
     * Encontra um utilizador pelo seu nome de utilizador.
     * A busca é case-sensitive.
     *
     * @param username O nome de utilizador a ser procurado.
     * @return Um Optional contendo o User, se encontrado.
     */
    Optional<User> findByUsername(String username);

    /**
     * Encontra um utilizador pelo seu endereço de e-mail.
     *
     * @param email O e-mail a ser procurado.
     * @return Um Optional contendo o User, se encontrado.
     */
    Optional<User> findByEmail(String email);

    /**
     * Procura por utilizadores cujo nome de utilizador contenha o termo de pesquisa,
     * ignorando maiúsculas/minúsculas, e excluindo o ID do próprio utilizador que está a pesquisar.
     *
     * @param searchTerm O termo a ser pesquisado.
     * @param selfId O ID do utilizador a ser excluído da pesquisa.
     * @return Uma lista de utilizadores que correspondem aos critérios.
     */
    @Query("SELECT u FROM User u WHERE lower(u.username) LIKE lower(concat('%', :searchTerm, '%')) AND u.id != :selfId")
    List<User> searchByUsernameContainingIgnoreCaseAndIdNot(
            @Param("searchTerm") String searchTerm,
            @Param("selfId") UUID selfId
    );
}