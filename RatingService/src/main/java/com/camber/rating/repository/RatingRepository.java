package com.camber.rating.repository;

import com.camber.rating.entities.Rating;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RatingRepository extends MongoRepository<Rating, String> {
    //metodo para encontrar
    List<Rating> findByUserId(String userId);
    List<Rating> findByHotelId(String hotelId);

}
