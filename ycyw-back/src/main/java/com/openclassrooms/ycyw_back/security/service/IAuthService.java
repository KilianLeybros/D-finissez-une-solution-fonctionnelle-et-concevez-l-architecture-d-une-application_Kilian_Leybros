package com.openclassrooms.ycyw_back.security.service;

import com.openclassrooms.ycyw_back.data.model.Customer;
import com.openclassrooms.ycyw_back.data.model.User;
import com.openclassrooms.ycyw_back.data.dto.auth.LoginInput;
import com.openclassrooms.ycyw_back.data.dto.auth.RegisterInput;
import jakarta.servlet.http.HttpServletResponse;

public interface IAuthService {
    Customer register(RegisterInput registerInput);
    User login(LoginInput loginInput);

    void authenticate(String email, String password, HttpServletResponse response);

    void addCookie(String email, HttpServletResponse response);
    User getCurrentUser();
}
