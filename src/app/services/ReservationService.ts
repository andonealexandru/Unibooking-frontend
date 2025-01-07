import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = environment.url + '/bookings';

  constructor(private http: HttpClient) {}

  public getMyBookings(date: Date) {
    console.log(date.getDate());

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString())

    return this.http.get(this.apiUrl + '/mine', {
      params: {
        date: date.toISOString().split('T')[0],
      },
      headers: headers
    });
  }
}
