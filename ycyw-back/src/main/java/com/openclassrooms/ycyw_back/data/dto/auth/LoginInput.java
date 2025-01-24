package com.openclassrooms.ycyw_back.data.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginInput(
        @NotBlank(message = "Veuillez entrer vos identifiants")
        String email,
        @NotBlank(message = "Veuillez entrer vos identifiants")
        String password
) {
}
