package com.openclassrooms.ycyw_back.service.impl;

import com.openclassrooms.ycyw_back.data.model.SupportRequest;
import com.openclassrooms.ycyw_back.data.model.User;
import com.openclassrooms.ycyw_back.data.repository.SupportRequestRepository;
import com.openclassrooms.ycyw_back.data.utils.enums.Role;
import com.openclassrooms.ycyw_back.security.service.AuthService;
import com.openclassrooms.ycyw_back.service.ISupportRequestService;
import com.openclassrooms.ycyw_back.data.dto.request.ChatResponse;
import com.openclassrooms.ycyw_back.data.dto.request.SupportRequestResponse;
import com.openclassrooms.ycyw_back.data.dto.mapper.SupportRequestMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SupportRequestService implements ISupportRequestService {

    @Autowired
    private SupportRequestRepository supportRequestRepository;

    @Autowired
    private AuthService authService;
    public List<SupportRequestResponse> findAllSupportRequest(){
        return SupportRequestMapper.toListSupportRequestResponse(supportRequestRepository.findWithAtLeastOneMessage());
    }

    @Transactional
    public ChatResponse findChatMessages(UUID id){
        User currentUser = authService.getCurrentUser();
        SupportRequest supportRequest = supportRequestRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        if(currentUser.getRole().equals(Role.CUSTOMER) && !supportRequest.getCustomer().getId().equals(currentUser.getId())){
            throw new AccessDeniedException("");
        }
        return SupportRequestMapper.toChatResponse(supportRequest, currentUser);
    }
}
