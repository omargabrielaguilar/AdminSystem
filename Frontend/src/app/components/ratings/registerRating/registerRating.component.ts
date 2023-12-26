import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from '../../../services/rating.service';
import { Rating } from '../../../models/Rating';
import { HotelService } from '../../../services/hotel.service';
import { UserService } from '../../../services/user.service';
import { Hotel } from '../../../models/Hotel';
import { User } from '../../../models/User';

@Component({
  selector: 'app-registerRating',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registerRating.component.html',
  styleUrls: ['./registerRating.component.css'],
})
export class RegisterRatingComponent implements OnInit {
  ratingForm: FormGroup;
  hotels: Hotel[] = [];
  users: User[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ratingService: RatingService,
    private hotelService: HotelService,
    private userService: UserService
  ) {
    this.ratingForm = this.formBuilder.group({
      userId: ['', Validators.required],
      hotelId: ['', [Validators.required]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      feedback: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllHotels();
    this.getAllUsers();
  }

  createRating(): void {
    const formData: Rating = this.ratingForm.value;
    this.ratingService.createRating(formData).subscribe({
      next: () => {
        this.router.navigateByUrl('/ratings');
      },
    });
  }

  getAllHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (hotels: Hotel[]) => {
        this.hotels = hotels;
      },
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
    });
  }
}
