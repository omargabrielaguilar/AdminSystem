import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/Hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private apiUrl = 'http://localhost:8082/hotels';

  constructor(private http: HttpClient) {}

  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, hotel);
  }

  getHotel(hotelId: string): Observable<Hotel> {
    const url = `${this.apiUrl}/${hotelId}`;
    return this.http.get<Hotel>(url);
  }

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  updateHotel(hotelId: string, hotel: Hotel): Observable<Hotel> {
    const url = `${this.apiUrl}/${hotelId}`;
    return this.http.put<Hotel>(url, hotel);
  }

  deleteHotel(hotelId: string): Observable<void> {
    const url = `${this.apiUrl}/${hotelId}`;
    return this.http.delete<void>(url);
  }
}
