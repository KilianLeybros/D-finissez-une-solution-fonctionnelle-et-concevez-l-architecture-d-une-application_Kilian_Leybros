package com.openclassrooms.ycyw_back.data.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "message")
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class Message {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name="content")
    private String content;


    @ManyToOne
    @JoinColumn(name="support_request_id", nullable = false)
    private SupportRequest supportRequest;


    @ManyToOne
    @JoinColumn(name="sender_id", nullable = false)
    private User sender;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;
}
