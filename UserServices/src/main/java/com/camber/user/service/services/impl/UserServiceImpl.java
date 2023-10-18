package com.camber.user.service.services.impl;

import com.camber.user.service.entities.UserEntity;
import com.camber.user.service.exceptions.ResourceNotFoundException;
import com.camber.user.service.repositories.UserRepository;
import com.camber.user.service.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserEntity saveUser(UserEntity user) {

        //genera unico userID
        String randomUserId = UUID.randomUUID().toString();
        user.setUserId(randomUserId);
        return userRepository.save(user);
    }

    @Override
    public List<UserEntity> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getUser(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Id de usuario no encontrado en el servidor!! " + userId));
    }
}
