package com.openclassrooms.ycyw_back.data.dto.request;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record MessageInput(@NotBlank @Length(max = 255) String content) {
}
