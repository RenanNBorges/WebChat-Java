package dev.rnborges.webchat.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketsConfig implements WebSocketMessageBrokerConfigurer {
    @Value("${app.websocket.allowed-origins}")
    private String[] allowedOrigins;

    @Autowired
    private WebSocketAuthInterceptor authInterceptor;


    /**
     * This method registers the STOMP endpoints.
     * The "/ws" endpoint is where clients will connect to the WebSocket server.
     * @param registry the STOMP endpoint registry.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*");
//                .withSockJS();
    }

    /**
     * This method configures the message broker.
     * It defines the prefixes for the destinations that clients can subscribe to and send messages to.
     * @param registry the message broker registry.
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){

        registry.setApplicationDestinationPrefixes("/app");

        registry.enableSimpleBroker("/topic", "/queue");

        registry.setUserDestinationPrefix("/user");
    }

    /**
     * This method configures the client inbound channel, allowing us to add interceptors.
     * We add our custom authentication interceptor to the chain.
     * @param registration the channel registration.
     */
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(authInterceptor);
    }



}
