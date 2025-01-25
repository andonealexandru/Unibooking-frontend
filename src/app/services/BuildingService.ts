import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  private apiUrl = environment.url + '/buildings';

  constructor(private http: HttpClient) {}

    public getBuildings() {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
  
      return this.http.get(this.apiUrl, { headers: headers });
    }

    public getBuildingsForMe() {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
  
      return this.http.get(this.apiUrl + "/for-me", { headers: headers });
    }

    public getRoomsForBuilding(id: number) {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
  
      return this.http.get(this.apiUrl + "/" + id + "/rooms", { headers: headers });
    }

    public createBuilding(data: any) {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

      return this.http.post(this.apiUrl, data, { headers: headers });
    }

    public updateBuilding(id: number, data: any) {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

      return this.http.patch(`${this.apiUrl}/${id}`, data, { headers: headers });
    }

    public deleteBuilding(id: number) {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());

      return this.http.delete(`${this.apiUrl}/${id}`, { headers: headers });
    }
}