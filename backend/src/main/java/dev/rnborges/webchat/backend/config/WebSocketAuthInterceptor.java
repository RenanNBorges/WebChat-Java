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

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        final StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        //  Adicione logs para ver o que está a acontecer
        log.info("Headers do Interceptor: {}", accessor.getMessageHeaders());

        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            log.info("Comando CONNECT recebido. A processar autenticação...");

            final String authHeader = accessor.getFirstNativeHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                final String jwt = authHeader.substring(7);
                final String username = jwtTokenProvider.extractUsername(jwt);

                log.info("Token extraído para o utilizador: {}", username);

                if (username != null) {
                    UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                    if (jwtTokenProvider.isTokenValid(jwt)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                        accessor.setUser(authToken);
                        log.info("Utilizador '{}' autenticado com sucesso para a sessão WebSocket.", username);
                    } else {
                        log.warn("Falha na validação do token JWT para o utilizador: {}", username);
                    }
                }
            } else {
                log.warn("Cabeçalho de Autorização em falta ou mal formatado no comando CONNECT.");
            }
        }
        return message;
    }
}
