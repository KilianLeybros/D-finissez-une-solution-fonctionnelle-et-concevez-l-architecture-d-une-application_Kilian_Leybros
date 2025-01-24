package com.openclassrooms.ycyw_back.data.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterInput(

    @NotBlank(message = "Votre prénom est obligatoire")
    @Size(max = 50, message="Votre prénom est trop long.")
    String firstName,

    @NotBlank(message = "Votre nom est obligatoire")
    @Size(max = 50, message="Votre nom est trop long.")
    String lastName,
    @NotBlank(message = "L'adresse email est obligatoire")
    @Size(max = 100, message="Adresse email est trop longue.")
    @Email(message = "Rentrez une adresse email valide")
    String email,
    @Size(min=8 ,message="Entrez un mot de passe d'au moins 8 caractères.")
    @Pattern(regexp=  "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])[A-Za-z0-9#?!@$%^&*-]{0,}$", message="Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial")
    String password
){}
