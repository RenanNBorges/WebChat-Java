package dev.rnborges.webchat.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.rnborges.webchat.backend.dto.LoginRequest;
import dev.rnborges.webchat.backend.dto.RegisterRequest;
import dev.rnborges.webchat.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest // Carrega o contexto completo da aplicação Spring.
@AutoConfigureMockMvc // Configura um MockMvc para simular requisições HTTP.
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc; // Ferramenta principal para simular as chamadas HTTP.

    @Autowired
    private ObjectMapper objectMapper; // Para converter objetos Java para JSON.

    @Autowired
    private UserRepository userRepository;

    // Limpa o banco de dados antes de cada teste para garantir a independência.
    @BeforeEach
    void cleanup() {
        userRepository.deleteAll();
    }

    @Test
    void shouldRegisterUserSuccessfully() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setUsername("testuser");
        registerRequest.setEmail("test@user.com");
        registerRequest.setPassword("password123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.email").value("test@user.com"));
    }

    @Test
    void shouldLoginSuccessfullyAndReturnToken() throws Exception {
        // First, register a user to be able to login
        shouldRegisterUserSuccessfully();

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("password123");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.token").isString());
    }
}