package dev.rnborges.webchat.backend.repository;

import dev.rnborges.webchat.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
// Interface using Spring Data JPA to create queries based in method
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
