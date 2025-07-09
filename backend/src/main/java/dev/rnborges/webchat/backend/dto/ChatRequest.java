package dev.rnborges.webchat.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ChatRequest {
    @Size(max = 100, message = "The group name cannot exceed 100 characters.")
    private String name;

    @NotNull
    private boolean isGroup;

    @NotNull
    @Size(min = 1, message = "The chat need a minimum of a one member.")
    private List<UUID> memberIds;
}
