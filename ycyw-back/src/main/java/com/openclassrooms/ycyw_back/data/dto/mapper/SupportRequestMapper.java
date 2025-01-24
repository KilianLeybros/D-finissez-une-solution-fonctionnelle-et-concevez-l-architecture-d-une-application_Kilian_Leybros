package com.openclassrooms.ycyw_back.data.dto.mapper;

import com.openclassrooms.ycyw_back.data.model.Admin;
import com.openclassrooms.ycyw_back.data.model.Message;
import com.openclassrooms.ycyw_back.data.model.SupportRequest;
import com.openclassrooms.ycyw_back.data.model.User;
import com.openclassrooms.ycyw_back.data.dto.request.ChatResponse;
import com.openclassrooms.ycyw_back.data.dto.request.MessageResponse;
import com.openclassrooms.ycyw_back.data.dto.request.SupportRequestResponse;

import java.util.List;
import java.util.stream.Collectors;

public class SupportRequestMapper {

    public static List<SupportRequestResponse> toListSupportRequestResponse(List<SupportRequest> supportRequestList){
       return supportRequestList.stream().map(sr -> new SupportRequestResponse(
               sr.getId(),
               sr.getCustomer().getFullName(),
               sr.getCustomer().getEmail())
       ).collect(Collectors.toList());
    }

    public static ChatResponse toChatResponse(SupportRequest supportRequest, User user){
        return new ChatResponse(user.isAdmin() ? supportRequest.getCustomer().getFullName() : new Admin().getFullName(),
                                supportRequest.getMessages().stream().map(SupportRequestMapper::toMessageResponse
                                ).collect(Collectors.toList())
        );
    }

    public static MessageResponse toMessageResponse(Message message){
        return new MessageResponse(message.getId(), message.getContent(), message.getSender().getId());
    }
}
