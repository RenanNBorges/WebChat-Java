package dev.rnborges.webchat.backend.service;

import dev.rnborges.webchat.backend.dto.LoginRequest;
import dev.rnborges.webchat.backend.dto.RegisterRequest;
import dev.rnborges.webchat.backend.model.User;
import dev.rnborges.webchat.backend.model.UserStatus;
import dev.rnborges.webchat.backend.repository.UserRepository;
import dev.rnborges.webchat.backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;


    /**
     * Register a new user
     *
     * @param request data to register (username, email, password).
     * @return User created.
     */
    public User register(RegisterRequest request) {

        // Check if username ou email exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username is already in use");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already in use");
        }

        // Create new Entity User
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .status(UserStatus.OFFLINE)
                .build();

        return userRepository.save(user);
    }

    ;

    /**
     * Autentica um usuário e retorna um token JWT.
     *
     * @param request os dados de login (username, password).
     * @return uma string contendo o token JWT.
     */
    public String login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // get User to generate tokem JWT
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Unexpected Error: Username not found after authentication"));

        // Generate and return JWT Token
        return jwtTokenProvider.generateToken(user);

    }
}
