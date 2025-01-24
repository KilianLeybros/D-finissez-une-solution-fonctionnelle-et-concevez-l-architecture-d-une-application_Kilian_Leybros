package com.openclassrooms.ycyw_back.web.handler;

import com.openclassrooms.ycyw_back.web.exception.EmailAlreadyExistException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.AuthenticationException;

@RestControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Error handleAccessDeniedException(AccessDeniedException exception){
        return new Error("Vous n'êtes pas authorisé");
    }

    @ExceptionHandler(SignatureException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Error handleSignatureException(SignatureException exception){
        return new Error("Signature du token invalide");
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Error handleExpiredJwtException(ExpiredJwtException exception){
        return new Error("JWT expiré");
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Error handleException(AuthenticationException exception){
        return new Error("Mauvais email/mot de passe");
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Error handleException(BadCredentialsException exception){
        return new Error("Mot de passe incorrect");
    }

    @ExceptionHandler(EmailAlreadyExistException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error handleEmailAlreadyExistException(EmailAlreadyExistException exception){return new Error(exception.getMessage());}
}