package com.openclassrooms.ycyw_back.web.controller;

import com.openclassrooms.ycyw_back.service.impl.SupportRequestService;
import com.openclassrooms.ycyw_back.data.dto.request.ChatResponse;
import com.openclassrooms.ycyw_back.data.dto.request.SupportRequestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/support-request")
public class SupportRequestController {

    @Autowired
    private SupportRequestService requestService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<SupportRequestResponse>> getAllSupportRequest(){
        return ResponseEntity.ok(requestService.findAllSupportRequest());
    }

    @GetMapping(path = "{id}/messages")
    public ResponseEntity<ChatResponse> getAllSupportRequestMessages(@PathVariable(value = "id") UUID id){
        return ResponseEntity.ok(requestService.findChatMessages(id));
    }
}
