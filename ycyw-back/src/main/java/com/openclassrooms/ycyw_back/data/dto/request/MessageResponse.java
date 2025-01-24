package com.openclassrooms.ycyw_back.data.dto.request;

import java.util.UUID;

public record MessageResponse(UUID id, String content, UUID sender) {
}
