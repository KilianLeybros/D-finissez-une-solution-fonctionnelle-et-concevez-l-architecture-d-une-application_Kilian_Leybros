package com.openclassrooms.ycyw_back.data.model;


import com.openclassrooms.ycyw_back.data.utils.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name="_user")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "role", discriminatorType = DiscriminatorType.STRING)
@Accessors(chain = true)
@Getter
@Setter
public abstract class User {

    public User(){}
    public User(String email,String password){
        this.email = email;
        this.password = password;
    }

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name="role", insertable = false, updatable = false, nullable = false)
    private Role role;

    @OneToMany(mappedBy = "sender")
    private Set<Message> messages;

    @CreationTimestamp
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    public abstract String getFullName();


    public boolean isAdmin(){
        return this.getRole() == Role.ADMIN;
    }

}
