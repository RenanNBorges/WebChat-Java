package repository;

import model.Chat;
import model.ChatMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatRepository extends JpaRepository<Chat, UUID> {
    @Query("SELECT c FROM Chat c JOIN c.members m WHERE m.user.id = :userID")
    List<Chat> findChatsByUserId(@Param("userID") UUID userID);
}
