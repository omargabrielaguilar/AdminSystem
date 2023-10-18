package com.camber.user.service.controllers;

import com.camber.user.service.entities.UserEntity;
import com.camber.user.service.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    //create
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user){
        UserEntity userEntity = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userEntity);
    }
}
