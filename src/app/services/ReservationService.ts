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
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
    date.setHours(7);
    return this.http.get(this.apiUrl + '/mine', {
      params: {
        date: date.toISOString().split('T')[0],
      },
      headers: headers
    });
  }

  public getMyBookingReadyForCheckIn() {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

    return this.http.get(this.apiUrl + '/mine/ready-for-check-in', { headers: headers });
  }

  public getMyActiveBooking() {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

    return this.http.get(this.apiUrl + '/mine/active', { headers: headers });
  }

  public createReservation(data: any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

    return this.http.post(this.apiUrl, data, { headers: headers });
  }

  public modifyReservation(id: number, data: any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

    return this.http.put(this.apiUrl + "/" + id, data, { headers: headers });
  }
}
