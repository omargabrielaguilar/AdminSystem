package com.camber.user.service.controllers;

import com.camber.user.service.entities.UserEntity;
import com.camber.user.service.services.UserService;
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
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user){
        UserEntity userEntity = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userEntity);
    }

    // Search user for id
    @GetMapping("/{userId}")
    public ResponseEntity<UserEntity> getSinglesUser(@PathVariable String userId){
        UserEntity userEntity = userService.getUser(userId);
        return ResponseEntity.ok(userEntity);
    }

    // listar
    @GetMapping
    public ResponseEntity<List<UserEntity>> getAllUser(){
        List<UserEntity> allUser = userService.getAllUser();
        return ResponseEntity.ok(allUser);
    }

}
