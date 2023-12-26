import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private baseUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) {}

  getStaffs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/staffs`);
  }
}
