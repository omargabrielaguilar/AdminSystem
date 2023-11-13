package com.camber.user.service.services.impl;

import com.camber.user.service.entities.Hotel;
import com.camber.user.service.entities.Rating;
import com.camber.user.service.entities.User;
import com.camber.user.service.exceptions.ResourceNotFoundException;
import com.camber.user.service.repositories.UserRepository;
import com.camber.user.service.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    //para trabajar con rating
    @Autowired
    private RestTemplate restTemplate;

    private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public User saveUser(User user) {

        //genera unico userID
        String randomUserId = UUID.randomUUID().toString();
        user.setUserId(randomUserId);
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUser() {
        //implementar Rating Service call: using rest template
        return userRepository.findAll();
    }

    @Override
    public User getUser(String userId) {
        //obtener usuario desde la BD
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Id de usuario no encontrado en el servidor!! " + userId));

        //fetch rating
        Rating[] ratingsOfUser = restTemplate.getForObject("http://RATING-SERVICE/ratings/users/"+user.getUserId(), Rating[].class);
        logger.info("{}",ratingsOfUser);

        List<Rating> ratings = Arrays.stream(ratingsOfUser).toList();

        List<Rating> ratingsList = ratings.stream().map(rating -> {
            //api call to hotel service to get the hole
            ResponseEntity<Hotel> forEntity = restTemplate.getForEntity("http://HOTEL-SERVICE/hotels/"+rating.getHotelId(), Hotel.class);

            Hotel hotel =forEntity.getBody();
            logger.info("response status code: {}",forEntity.getStatusCode());

            // set the hotel to rating
            rating.setHotel(hotel);

            // return rating
            return rating;
        }).collect(Collectors.toList());

        user.setRatings(ratingsList);

        return user;
    }
}
