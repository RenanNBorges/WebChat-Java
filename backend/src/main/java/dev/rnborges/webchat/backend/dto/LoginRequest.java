package dev.rnborges.webchat.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "The username field cannot be empty.")
    private String username;

    @NotBlank(message = "The password field cannot be empty.")
    private String password;

}
