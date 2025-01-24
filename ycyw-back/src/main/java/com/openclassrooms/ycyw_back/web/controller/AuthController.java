package com.openclassrooms.ycyw_back.web.controller;

import com.openclassrooms.ycyw_back.data.model.User;
import com.openclassrooms.ycyw_back.security.service.IAuthService;
import com.openclassrooms.ycyw_back.web.dto.auth.AuthResponse;
import com.openclassrooms.ycyw_back.web.dto.auth.LoginInput;
import com.openclassrooms.ycyw_back.web.dto.auth.RegisterInput;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private IAuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterInput registerInput, HttpServletResponse response){
        User registeredUser = authService.register(registerInput);
        authService.authenticate(registeredUser.getEmail(), registerInput.password(), response);
        return ResponseEntity.ok(
                new AuthResponse(registeredUser.getId(),
                        registeredUser.getEmail(),
                        registeredUser.getFullName(),
                        registeredUser.getRole(),
                        registeredUser.getPassword())
        );
    }


    @PostMapping("/logout")
    public void logout(){}


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginInput loginInput, HttpServletResponse response){
        User loggedInUser = authService.login(loginInput);
        authService.authenticate(loggedInUser.getEmail(), loginInput.password(), response);
        return ResponseEntity.ok(
                new AuthResponse(loggedInUser.getId(),
                        loggedInUser.getEmail(),
                        loggedInUser.getFullName(),
                        loggedInUser.getRole(),
                        loggedInUser.getPassword())
        );
    }

    @GetMapping("/authenticated")
    public ResponseEntity<AuthResponse> getCurrentUser(){
        User user = authService.getCurrentUser();
        if(user != null){
            return ResponseEntity.ok(
                    new AuthResponse(user.getId(),
                            user.getEmail(),
                            user.getFullName(),
                            user.getRole(),
                            user.getPassword())
            );
        }
        return null;
    }

}