package dev.rnborges.webchat.backend.websocket;


import dev.rnborges.webchat.backend.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * Listens for WebSocket disconnection events.
     * When a user disconnects, this method is triggered.
     * @param event The disconnect event.
     */
    @EventListener
    public void handleWebSocketDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        UsernamePasswordAuthenticationToken sessionAuth = (UsernamePasswordAuthenticationToken) headerAccessor.getUser();
        if (sessionAuth != null) {
            User disconnectedUser = (User) sessionAuth.getPrincipal();
            log.info("[INFO] User Disconnected: " + disconnectedUser.getUsername());

            var chatMessage = ChatMessage.builder()
                    .type(MessageType.LEAVE)
                    .senderId(disconnectedUser.getId())
                    .senderUsername(disconnectedUser.getUsername())
                    .build();
        }
    }

    @EventListener
    public void handleWebSocketConnect(SessionConnectedEvent event) {
        log.info("[INFO] A new websocket connection has been established");
    }
}
