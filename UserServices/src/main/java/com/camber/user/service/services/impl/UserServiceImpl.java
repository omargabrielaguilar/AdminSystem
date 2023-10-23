package com.camber.user.service.services.impl;

import com.camber.user.service.entities.User;
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
    public User saveUser(User user) {

        //genera unico userID
        String randomUserId = UUID.randomUUID().toString();
        user.setUserId(randomUserId);
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Id de usuario no encontrado en el servidor!! " + userId));
    }
}
