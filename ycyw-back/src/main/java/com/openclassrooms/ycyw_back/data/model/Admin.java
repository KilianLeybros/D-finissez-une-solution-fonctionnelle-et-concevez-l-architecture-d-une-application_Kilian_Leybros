package com.openclassrooms.ycyw_back.data.model;

import com.openclassrooms.ycyw_back.data.utils.enums.Role;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("ADMIN")
@Getter
@Setter
public class Admin extends User {

    public Admin(){}
    public Admin(String email, String password, Role role){
        super(email, password);
    }

    @Override
    public String getFullName(){
        return "Service client";
    }
}
