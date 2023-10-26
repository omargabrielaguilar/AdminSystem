package com.camber.hotel.controllers;

import com.camber.hotel.repositories.HotelRepository;
import com.camber.hotel.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(name = "/hotels")
public class HotelController {
    @Autowired
    private HotelService hotelService;

    //create
    //getAll
    //getById
}
