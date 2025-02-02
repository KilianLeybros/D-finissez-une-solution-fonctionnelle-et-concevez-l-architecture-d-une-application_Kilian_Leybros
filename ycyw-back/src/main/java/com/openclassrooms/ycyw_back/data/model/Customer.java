package com.openclassrooms.ycyw_back.data.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


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
        this.supportRequest = new SupportRequest().setCustomer(this);
    }

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.PERSIST)
    private SupportRequest supportRequest;

    @Override
    public String getFullName(){
        return this.getFirstName() + " " + this.getLastName();
    }
}
