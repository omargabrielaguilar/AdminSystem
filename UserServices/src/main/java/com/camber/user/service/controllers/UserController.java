package com.camber.user.service.controllers;

import com.camber.user.service.entities.User;
import com.camber.user.service.services.UserService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    //create
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        User userEntity = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userEntity);
    }

    // Search user for id
    int retryCount = 1;
    @GetMapping("/{userId}")
    //@CircuitBreaker(name = "ratingHotelBreaker", fallbackMethod = "ratingHotelFallback" )
    @Retry(name = "ratingHotelService", fallbackMethod = "ratingHotelFallback")
    public ResponseEntity<User> getSinglesUser(@PathVariable String userId){
        logger.info("Get single user handler: UserController");
        logger.info("Retry count: {}", retryCount );
        retryCount++;
        User userEntity = userService.getUser(userId);
        return ResponseEntity.ok(userEntity);
    }


    //crear el metodo fallbakc
    public ResponseEntity<User> ratingHotelFallback(String userId, Exception ex) {
        //logger.info("fallback esta siendo ejecutado porque los servicios están caidos: ", ex.getMessage());

        User user = User.builder()
                .email("omareegab@gmail.com")
                .name("Omar")
                .about("este usuario creado a prueba, el sistema esta en modo down")
                .userId("141234")
                .build();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    // listar
    @GetMapping
    public ResponseEntity<List<User>> getAllUser(){
        List<User> allUser = userService.getAllUser();
        return ResponseEntity.ok(allUser);
    }

}
