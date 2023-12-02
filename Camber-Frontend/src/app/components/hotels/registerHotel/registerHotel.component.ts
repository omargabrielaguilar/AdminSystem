import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotelService } from '../../../services/hotel.service';
import { Hotel } from '../../../models/Hotel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerHotel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registerHotel.component.html',
  styleUrls: ['./registerHotel.component.css'],
})
export class RegisterHotelComponent implements OnInit {
  hotelForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private hotelService: HotelService
  ) {
    this.hotelForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      about: ['', Validators.required],
    });
  }

  ngOnInit() {}

  createHotel(): void {
    const formData: Hotel = this.hotelForm.value;
    this.hotelService.createHotel(formData).subscribe({
      next: () => {
        this.router.navigateByUrl('/hotels');
      },
    });
  }
}
