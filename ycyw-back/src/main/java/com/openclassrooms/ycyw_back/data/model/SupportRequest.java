package com.openclassrooms.ycyw_back.data.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name="support_request")
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class SupportRequest {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne
    @JoinColumn(name="user_id", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "supportRequest", fetch = FetchType.LAZY)
    @OrderBy("createdAt ASC")
    private Set<Message> messages;
}
