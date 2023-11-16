package com.camber.user.service.controllers;

import com.camber.user.service.entities.User;
import com.camber.user.service.services.UserService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    //create
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        User userEntity = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userEntity);
    }

    // Search user for id
    @GetMapping("/{userId}")
    @CircuitBreaker(name = "ratingHotelBreaker", fallbackMethod = "ratingHotelFallback" )
    public ResponseEntity<User> getSinglesUser(@PathVariable String userId){
        User userEntity = userService.getUser(userId);
        return ResponseEntity.ok(userEntity);
    }


    //crear el metodo fallbakc
    public ResponseEntity<User> ratingHotelFallback(String userId, Exception ex) {

    }


    // listar
    @GetMapping
    public ResponseEntity<List<User>> getAllUser(){
        List<User> allUser = userService.getAllUser();
        return ResponseEntity.ok(allUser);
    }

}
