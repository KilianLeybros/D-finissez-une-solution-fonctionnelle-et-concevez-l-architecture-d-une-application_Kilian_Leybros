package com.openclassrooms.ycyw_back.service;

import com.openclassrooms.ycyw_back.data.dto.request.MessageInput;
import com.openclassrooms.ycyw_back.data.dto.request.MessageResponse;

import java.security.Principal;
import java.util.UUID;

public interface IMessageService {
    MessageResponse postMessage(UUID supportRequestId, MessageInput messageInput, Principal principal);
}
