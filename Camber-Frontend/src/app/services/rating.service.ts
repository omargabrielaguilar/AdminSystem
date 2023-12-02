import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../models/Rating';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private apiUrl = 'http://localhost:8083/ratings';

  constructor(private http: HttpClient) {}

  createRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.apiUrl, rating);
  }

  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.apiUrl);
  }

  getRatingsByUserId(userId: string): Observable<Rating[]> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<Rating[]>(url);
  }

  getRatingsByHotelId(hotelId: string): Observable<Rating[]> {
    const url = `${this.apiUrl}/hotels/${hotelId}`;
    return this.http.get<Rating[]>(url);
  }

  updateRating(ratingId: string, rating: Rating): Observable<Rating> {
    const url = `${this.apiUrl}/${ratingId}`;
    return this.http.put<Rating>(url, rating);
  }

  deleteRating(ratingId: string): Observable<void> {
    const url = `${this.apiUrl}/${ratingId}`;
    return this.http.delete<void>(url);
  }
}
