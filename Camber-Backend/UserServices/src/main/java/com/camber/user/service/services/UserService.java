package com.camber.user.service.services;

import com.camber.user.service.entities.User;
import java.util.List;

public interface UserService {
    //create
    User saveUser(User user);

    //get all users
    List<User> getAllUser();

    //get single user of given userId -> buscar practicamente
    User getUser(String userId);

    //delete
    User updateUser(String userId, User user);

    //update
    void deleteUser(String userId);
}
