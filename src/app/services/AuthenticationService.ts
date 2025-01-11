import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationService {
    private apiUrl = environment.url + "/auth";

    constructor(private http: HttpClient) { }

    public login(credentials: any) {
      return this.http.post(this.apiUrl + "/login", credentials, {responseType: 'text'});
    }

    public retrieveCurrentUserData() {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
      return this.http.get(this.apiUrl + "/current-user", {headers});
    }

    public isLoggedIn() {
      if (localStorage.getItem('token') == null || localStorage.getItem('user') == null)
        return false;

      this.retrieveCurrentUserData().subscribe(response => {
        //console.log(response.status)
      })

      return true;
    }
  }