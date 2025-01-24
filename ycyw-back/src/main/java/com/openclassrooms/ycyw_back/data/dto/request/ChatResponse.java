package com.openclassrooms.ycyw_back.data.dto.request;

import java.util.List;

public record ChatResponse(String addresseeName, List<MessageResponse> messages) {
}
