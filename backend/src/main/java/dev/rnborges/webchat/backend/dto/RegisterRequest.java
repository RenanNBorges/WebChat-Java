package dev.rnborges.webchat.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class RegisterRequest {
    @NotBlank(message = "The username field cannot be empty.")
    @Size(min = 3, max = 20, message = "The username length is between 3 and 20 characters.")
    private String username;

    @NotBlank(message = "The password field cannot be empty.")
    @Size(min = 8, max = 64, message = "The password length is between 8 and 64 characters.")
    private String password;

    @NotBlank(message = "The email field cannot be empty.")
    @Email(message = "Invalid email format.")
    private String email;


}
