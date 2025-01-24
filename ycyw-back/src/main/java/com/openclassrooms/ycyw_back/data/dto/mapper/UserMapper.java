package com.openclassrooms.ycyw_back.data.dto.mapper;


import com.openclassrooms.ycyw_back.data.model.Customer;
import com.openclassrooms.ycyw_back.data.dto.auth.RegisterInput;

public class UserMapper {

    public static Customer fromRegisterInput(RegisterInput registerInput, String encodedPassword){
        return new Customer(registerInput.email(), encodedPassword, registerInput.firstName(), registerInput.lastName());
    }


}
