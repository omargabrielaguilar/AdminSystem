package com.camber.rating.services.impl;

import com.camber.rating.entities.Rating;
import com.camber.rating.repository.RatingRepository;
import com.camber.rating.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {
    @Autowired
    private RatingRepository repository;

    @Override
    public Rating create(Rating rating) {
        return repository.save(rating);
    }

    @Override
    public List<Rating> getRatings() {
        return repository.findAll();
    }

    @Override
    public List<Rating> getRatingByUserId(String userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public List<Rating> getRatingByHotelId(String hotelId) {
        return repository.findByHotelId(hotelId);
    }

    @Override
    public Rating update(Rating rating) {
        Rating existingRating = repository.findById(rating.getRatingId())
                .orElseThrow(() -> new RuntimeException("Rating no encontrado con ID: " + rating.getRatingId()));

        existingRating.setUserId(rating.getUserId());
        existingRating.setHotelId(rating.getHotelId());
        existingRating.setRating(rating.getRating());
        existingRating.setFeedback(rating.getFeedback());

        return repository.save(existingRating);
    }

    @Override
    public void delete(String id) {
        Rating existingRating = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rating no encontrado con ID: " + id));

        repository.delete(existingRating);
    }
}
