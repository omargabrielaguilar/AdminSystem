import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/Hotel';
import { HotelService } from '../../services/hotel.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit() {
    this.getAllHotels();
  }

  getAllHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (hotels: Hotel[]) => {
        this.hotels = hotels;
      },
    });
  }

  updateHotel(hotelId: string): void {
    this.router.navigateByUrl(`/hotels/${hotelId}`);
  }

  deleteHotel(hotelId: string): void {
    this.hotelService.deleteHotel(hotelId).subscribe({
      next: () => {
        this.getAllHotels();
      },
    });
  }
}
