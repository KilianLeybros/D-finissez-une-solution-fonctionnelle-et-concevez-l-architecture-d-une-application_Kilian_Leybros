package com.openclassrooms.ycyw_back.service.impl;

import com.openclassrooms.ycyw_back.data.model.Message;
import com.openclassrooms.ycyw_back.data.model.SupportRequest;
import com.openclassrooms.ycyw_back.data.model.User;
import com.openclassrooms.ycyw_back.data.repository.MessageRepository;
import com.openclassrooms.ycyw_back.data.repository.SupportRequestRepository;
import com.openclassrooms.ycyw_back.data.repository.UserRepository;
import com.openclassrooms.ycyw_back.service.IMessageService;
import com.openclassrooms.ycyw_back.data.dto.request.MessageInput;
import com.openclassrooms.ycyw_back.data.dto.request.MessageResponse;
import com.openclassrooms.ycyw_back.data.dto.mapper.SupportRequestMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.UUID;

@Service
public class MessageService implements IMessageService {

    @Autowired
    public SupportRequestRepository supportRequestRepository;

    @Autowired
    public MessageRepository messageRepository;

    @Autowired
    public UserRepository userRepository;

    public MessageResponse postMessage(UUID supportRequestId, MessageInput messageInput, Principal principal){
        UserDetails userDetails = ((UserDetails) ((UsernamePasswordAuthenticationToken) principal).getPrincipal());
        User sender =  userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() ->
                new EntityNotFoundException("l'utilisateur n'a pas été trouvé")
        );
        SupportRequest supportRequest = supportRequestRepository.findById(supportRequestId).orElseThrow(EntityNotFoundException::new);
        return SupportRequestMapper.toMessageResponse(messageRepository.save(new Message()
                .setSender(sender)
                .setContent(messageInput.content())
                .setSupportRequest(supportRequest)));
    }
}
