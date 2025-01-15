import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})export class TimesheetService {
    private apiUrl = environment.url + "/timesheet";

    constructor(private http: HttpClient) { }

    public uploadTimesheet(file: any, startDate: any, endDate: any) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
        
        let fileFormData = new FormData();

        fileFormData.append('file', file, file.name);

        return this.http.post(this.apiUrl, fileFormData, {
            params: {
                start: startDate.split('T')[0],
                end: endDate.split('T')[0]
            },
            headers: headers
        });
    }
}