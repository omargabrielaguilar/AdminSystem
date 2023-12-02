import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hotel } from '../../../models/Hotel';
import { User } from '../../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from '../../../services/rating.service';
import { HotelService } from '../../../services/hotel.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-updateRating',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updateRating.component.html',
  styleUrls: ['./updateRating.component.css'],
})
export class UpdateRatingComponent implements OnInit {
  ratingForm: FormGroup;
  hotels: Hotel[] = [];
  users: User[] = [];
  ratingId!: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ratingService: RatingService,
    private hotelService: HotelService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.ratingForm = this.formBuilder.group({
      userId: ['', Validators.required],
      hotelId: ['', [Validators.required]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      feedback: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.ratingId = params['id'];
    });
    this.getAllHotels();
    this.getAllUsers();
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

  updateRating() {
    const updatedRatingData = this.ratingForm.value;
    this.ratingService
      .updateRating(this.ratingId, updatedRatingData)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/ratings');
        },
      });
  }
}
