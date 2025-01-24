package com.openclassrooms.ycyw_back.web.controller;

import com.openclassrooms.ycyw_back.data.model.Customer;
import com.openclassrooms.ycyw_back.data.model.User;
import com.openclassrooms.ycyw_back.data.utils.TypeUtils;
import com.openclassrooms.ycyw_back.security.service.IAuthService;
import com.openclassrooms.ycyw_back.data.dto.auth.AuthResponse;
import com.openclassrooms.ycyw_back.data.dto.auth.LoginInput;
import com.openclassrooms.ycyw_back.data.dto.auth.RegisterInput;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private IAuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterInput registerInput, HttpServletResponse response){
        Customer registeredUser = authService.register(registerInput);
        authService.authenticate(registeredUser.getEmail(), registerInput.password(), response);
        return ResponseEntity.ok(
                new AuthResponse(registeredUser.getId(),
                        registeredUser.getEmail(),
                        registeredUser.getFullName(),
                        registeredUser.getRole(),
                        registeredUser.getPassword(),
                        registeredUser.getSupportRequest().getId())
        );
    }


    @PostMapping("/logout")
    public void logout(){}


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginInput loginInput, HttpServletResponse response){
        User loggedInUser = authService.login(loginInput);
        Optional<Customer> customer = TypeUtils.cast(loggedInUser, Customer.class);
        authService.authenticate(loggedInUser.getEmail(), loginInput.password(), response);
        return ResponseEntity.ok(
                new AuthResponse(loggedInUser.getId(),
                        loggedInUser.getEmail(),
                        loggedInUser.getFullName(),
                        loggedInUser.getRole(),
                        loggedInUser.getPassword(),
                        customer.map(value -> value.getSupportRequest().getId()).orElse(null))
        );
    }

    @GetMapping("/authenticated")
    public ResponseEntity<AuthResponse> getCurrentUser(){
        User user = authService.getCurrentUser();
        Optional<Customer> customer = TypeUtils.cast(user, Customer.class);
        if(user != null){
            return ResponseEntity.ok(
                    new AuthResponse(user.getId(),
                            user.getEmail(),
                            user.getFullName(),
                            user.getRole(),
                            user.getPassword(),
                            customer.map(value -> value.getSupportRequest().getId()).orElse(null))
            );
        }
        return ResponseEntity.noContent().build();
    }

}