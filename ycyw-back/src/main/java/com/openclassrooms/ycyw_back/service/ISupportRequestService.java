package com.openclassrooms.ycyw_back.service;

import com.openclassrooms.ycyw_back.data.dto.request.ChatResponse;
import com.openclassrooms.ycyw_back.data.dto.request.SupportRequestResponse;

import java.util.List;
import java.util.UUID;

public interface ISupportRequestService {

    List<SupportRequestResponse> findAllSupportRequest();

    ChatResponse findChatMessages(UUID id);
}
