package com.openclassrooms.ycyw_back.web.mapper;


import com.openclassrooms.ycyw_back.data.model.Customer;
import com.openclassrooms.ycyw_back.data.model.User;
import com.openclassrooms.ycyw_back.web.dto.auth.RegisterInput;

public class UserMapper {

    public static Customer fromRegisterInput(RegisterInput registerInput, String encodedPassword){
        return new Customer(registerInput.email(), encodedPassword, registerInput.firstName(), registerInput.lastName());
    }


}
