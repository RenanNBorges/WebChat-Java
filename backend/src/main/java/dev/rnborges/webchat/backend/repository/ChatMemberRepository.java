package dev.rnborges.webchat.backend.repository;

import dev.rnborges.webchat.backend.model.ChatMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChatMemberRepository extends JpaRepository<ChatMember, UUID> {
}
