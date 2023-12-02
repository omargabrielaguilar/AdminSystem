import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Rating } from '../../models/Rating';
import { RatingService } from '../../services/rating.service';
import { Hotel } from '../../models/Hotel';
import { User } from '../../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hotelCount: number = 0;
  ratingCount: number = 0;
  userCount: number = 0;

  constructor(
    private hotelService: HotelService,
    private ratingService: RatingService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fetchHotelCount();
    this.fetchRatingCount();
    this.fetchUserCount();
  }

  fetchHotelCount() {
    this.hotelService.getAllHotels().subscribe((hotels: Hotel[]) => {
      this.hotelCount = hotels.length;
    });
  }

  fetchRatingCount() {
    this.ratingService.getRatings().subscribe((ratings: Rating[]) => {
      this.ratingCount = ratings.length;
    });
  }

  fetchUserCount() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.userCount = users.length;
    });
  }
}
