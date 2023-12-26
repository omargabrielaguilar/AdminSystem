import { Component, OnInit } from '@angular/core';
import { Rating } from '../../models/Rating';
import { RatingService } from '../../services/rating.service';
import { Router, RouterModule } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { Hotel } from '../../models/Hotel';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
})
export class RatingsComponent implements OnInit {
  ratings: Rating[] = [];

  constructor(
    private ratingService: RatingService,
    private router: Router,
    private hotelService: HotelService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllRatings();
  }

  updateRating(ratingId: string): void {
    this.router.navigateByUrl(`/ratings/${ratingId}`);
  }

  formatFeedback(feedback: string): string {
    const words = feedback.split(' ');
    const chunkSize = 11;
    const chunks: string[] = [];

    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(' '));
    }

    return chunks.join('<br>');
  }

  getAllRatings() {
    this.ratingService.getRatings().subscribe({
      next: (ratings: Rating[]) => {
        this.ratings = ratings;

        this.ratings.forEach((rating, index) => {
          this.userService
            .getUserById(rating.userId)
            .subscribe((user: User) => {
              this.ratings[index].userId = user.name;
            });

          this.hotelService
            .getHotel(rating.hotelId)
            .subscribe((hotel: Hotel) => {
              this.ratings[index].hotelId = hotel.name + ' - ' + hotel.location;
            });
        });
      },
    });
  }

  deleteRating(ratingId: string): void {
    this.ratingService.deleteRating(ratingId).subscribe({
      next: () => {
        this.getAllRatings();
      },
    });
  }
}
