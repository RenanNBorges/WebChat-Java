package dev.rnborges.webchat.backend.config;

import dev.rnborges.webchat.backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketAuthInterceptor implements ChannelInterceptor {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserDetailsService userDetailsService;

    /**
     * This method is called before a message is sent to a channel.
     * We will use it to intercept the CONNECT command and authenticate the user.
     * @param message The message being sent.
     * @param channel The channel the message is being sent to.
     * @return The message, possibly modified, or null if the message should be dropped.
     */
    @Override
    public Message<?> preSend(Message<?> message,
                              MessageChannel channel){
        final StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        // Check if the message have authorization and a valid username
        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            final String authHeader = accessor.getFirstNativeHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                final String token = authHeader.substring(7);
                final String username = jwtTokenProvider.extractUsername(token);

                if (username != null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    if (jwtTokenProvider.isTokenValid(token)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                        );

                        accessor.setUser(authToken);
                        log.info("Authentication successful to WebSOcket session for user: ", username);
                    }
                }
            }
        }
        return message;
    }
}
