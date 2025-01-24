package com.openclassrooms.ycyw_back.data.repository;

import com.openclassrooms.ycyw_back.data.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
}
