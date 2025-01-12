import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private apiurl = environment.url + "/rooms/";

    constructor(private http: HttpClient) {}

    public getLastBookingForRoomBefore(id: number, date: Date) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

        return this.http.get(this.apiurl + id + '/bookings/last', {
            params: {
                before: date.toISOString().slice(0, -1),
            },
            headers: headers
        });
    }

    public getFirstBookingForRoomAfter(id: number, date: Date) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

        return this.http.get(this.apiurl + id + '/bookings/first', {
            params: {
                after: date.toISOString().slice(0, -1),
            },
            headers: headers
        });
    }

    public getBookingsForRoomBetween(id: number, start: Date, end: Date) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

        return this.http.get(this.apiurl + id + '/bookings/between', {
            params: {
                start: start.toISOString().slice(0, -1),
                end: end.toISOString().slice(0, -1),
            },
            headers: headers
        });
    }

    public getWorkstationTypes() {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
        return this.http.get(`${this.apiurl}workstation-types`, {headers});
    }

    public formatWorkstation(input: String) {
        return input
            .toLowerCase() // Convert to lowercase: "something_bla_bla"
            .split('_')    // Split by underscores: ["something", "bla", "bla"]
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' ');
    }
}