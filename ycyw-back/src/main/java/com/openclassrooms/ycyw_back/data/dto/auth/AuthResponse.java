package com.openclassrooms.ycyw_back.data.dto.auth;


import com.openclassrooms.ycyw_back.data.utils.enums.Role;

import java.util.UUID;

public record AuthResponse(UUID id, String email, String fullName, Role role, String password, UUID supportRequestId) {
}
