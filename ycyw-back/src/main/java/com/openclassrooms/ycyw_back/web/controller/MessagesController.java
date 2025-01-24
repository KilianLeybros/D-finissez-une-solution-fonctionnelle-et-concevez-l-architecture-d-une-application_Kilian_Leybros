package com.openclassrooms.ycyw_back.web.controller;

import com.openclassrooms.ycyw_back.service.impl.MessageService;
import com.openclassrooms.ycyw_back.data.dto.request.MessageInput;
import com.openclassrooms.ycyw_back.data.dto.request.MessageResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.UUID;

@Controller
public class MessagesController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/sendMessage/{supportRequestId}")
    @SendTo("/channel/{supportRequestId}/messages")
    public MessageResponse handleMessage(@DestinationVariable UUID supportRequestId, @Valid MessageInput message, SimpMessageHeaderAccessor headerAccessor) {
        Principal principal = headerAccessor.getUser();
        return messageService.postMessage(supportRequestId, message, principal);
    }
}
