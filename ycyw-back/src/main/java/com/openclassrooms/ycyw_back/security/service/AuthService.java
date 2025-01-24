package com.openclassrooms.ycyw_back.security.service;


import com.openclassrooms.ycyw_back.data.model.Customer;
import com.openclassrooms.ycyw_back.data.model.User;
import com.openclassrooms.ycyw_back.data.repository.UserRepository;
import com.openclassrooms.ycyw_back.data.dto.auth.LoginInput;
import com.openclassrooms.ycyw_back.data.dto.auth.RegisterInput;
import com.openclassrooms.ycyw_back.web.exception.EmailAlreadyExistException;
import com.openclassrooms.ycyw_back.data.dto.mapper.UserMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService implements IAuthService {


    private final UserRepository userRepository;


    private final PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Value("${jwt.cookieDuration}")
    private int cookieExpiration;


    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Customer register(RegisterInput registerInput){
        userRepository.findByEmail(registerInput.email()).ifPresent((user) -> {
            throw new EmailAlreadyExistException("Adresse email déjà utilisée");
        });
        String encodedPassword = passwordEncoder.encode(registerInput.password());
        return userRepository.save(UserMapper.fromRegisterInput(registerInput, encodedPassword));
    }

    public User login(LoginInput loginInput){
        return userRepository.findByEmail(loginInput.email()).orElseThrow(() ->
                new EntityNotFoundException("Cette adresse email ne correspond à aucun compte.")
        );
    }

    public void authenticate(String email, String password, HttpServletResponse response){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        if(authentication.isAuthenticated()) {
            addCookie(email, response);
        }
    }

    public void addCookie(String email,  HttpServletResponse response){
        String token = jwtService.generateToken(email);
        // set token to cookie header
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(cookieExpiration)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private UserDetails getAuthenticatedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getClass().equals(AnonymousAuthenticationToken.class)){
            return null;
        }
        return (UserDetails) authentication.getPrincipal();
    }

    public User getCurrentUser(){
        UserDetails authenticatedUser = getAuthenticatedUser();
        if(authenticatedUser != null){
            return userRepository.findByEmail(getAuthenticatedUser().getUsername()).orElseThrow(() ->
                    new EntityNotFoundException("l'utilisateur n'a pas été trouvé")
            );
        }
        return null;
    }



}