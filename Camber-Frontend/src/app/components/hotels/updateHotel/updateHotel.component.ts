import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';

@Component({
  selector: 'app-updateHotel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updateHotel.component.html',
  styleUrls: ['./updateHotel.component.css'],
})
export class UpdateHotelComponent implements OnInit {
  hotelForm: FormGroup;
  hotelId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.hotelForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      about: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hotelId = params['id'];
      this.getHotelDetails();
    });
  }

  getHotelDetails() {
    this.hotelService.getHotel(this.hotelId).subscribe((hotel) => {
      this.hotelForm.patchValue({
        name: hotel.name,
        location: hotel.location,
        about: hotel.about,
      });
    });
  }

  updateHotel() {
    const updatedHotelData = this.hotelForm.value;
    this.hotelService.updateHotel(this.hotelId, updatedHotelData).subscribe({
      next: () => {
        this.router.navigateByUrl('/hotels');
      },
    });
  }
}
