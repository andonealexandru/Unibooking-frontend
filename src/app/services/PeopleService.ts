import { query } from "@angular/animations";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class PeopleService {
    private apiUrl = environment.url + '/people';

    constructor(private http: HttpClient) {}

    getAllPeople(data: any) {
      let params = new HttpParams();
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

      if (data.type != null) {
        params = params.set("type", data.type);
      }

      if (data.query != null) {
        params = params.set("query", data.query);
      }

      return this.http.get(this.apiUrl, {params, headers});
    }

    updatePerson(id: number, data: any) {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
      return this.http.patch(`${this.apiUrl}/${id}`, data, {headers});
    }
}