package com.openclassrooms.ycyw_back.web.dto.auth;


import com.openclassrooms.ycyw_back.data.enums.Role;

import java.util.UUID;

public record AuthResponse(UUID id, String email, String fullName, Role role, String password) {
}
