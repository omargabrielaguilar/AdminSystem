package com.camber.user.service.exceptions;

import com.camber.user.service.payload.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException exception){
        return null;
    }
}
