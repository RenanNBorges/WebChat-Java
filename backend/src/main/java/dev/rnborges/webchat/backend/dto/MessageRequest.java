package dev.rnborges.webchat.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class MessageRequest {
    @NotNull(message = "ID is obrigatory.")
    private UUID chatId;

    @NotBlank(message = "Message content cannot be empty.")
    private String content;
}
