package com.openclassrooms.ycyw_back.data.dto.request;

import java.util.UUID;

public record SupportRequestResponse(UUID id, String addresseeName, String addresseeEmail) {
}
