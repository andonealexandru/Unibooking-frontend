import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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

    public findRoomSlots(data: any) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
        return this.http.get(`${this.apiurl}find`, {
            params: {
                buildingCode: data.building?.code,
                roomCode: data.room?.code,
                workstationType: data.workstationType,
                capacity: data.capacity,
                workstationCount: data.workstationCount,
                date: data.date.split('T')[0],
                start: data.startHour.split('T')[1].slice(0, -3),
                end: data.endHour.split('T')[1].slice(0, -3),
            },
            headers: headers
        })
    }

    public find(data: any) {
      console.log(data);
        let params = new HttpParams();
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
    
        if (data.building != null) {
          params = params.set('buildingCode', data.building.code);
        }
        if (data.room != null) {
          params = params.set('roomCode', data.room.code);
        }
        if (data.workstationType != null) {
          params = params.set('workstationType', data.workstationType);
        }
        if (data.capacity != null) {
          params = params.set('capacity', data.capacity);
        }
        if (data.workstationCount != null) {
          params = params.set('workstationCount', data.workstationCount);
        }
        if (data.date != null) {
          params = params.set('date', data.date.split('T')[0]);
        }
        if (data.startHour != null) {
          params = params.set('start', data.startHour.split('T')[1].slice(0, -3));
        }
        if (data.endHour != null) {
          params = params.set('end', data.endHour.split('T')[1].slice(0, -3));
        }

        return this.http.get(`${this.apiurl}find`, { params, headers });
      }
}