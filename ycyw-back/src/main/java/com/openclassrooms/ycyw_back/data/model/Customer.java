package com.openclassrooms.ycyw_back.data.model;

import com.openclassrooms.ycyw_back.data.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Entity
@DiscriminatorValue("CUSTOMER")
@Getter
@Setter
public class Customer extends User {

    public Customer(){}
    public Customer(String email, String password, String firstName, String lastName){
        super(email, password);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Override
    public String getFullName(){
        return this.getFirstName() + " " + this.getLastName();
    }
}
