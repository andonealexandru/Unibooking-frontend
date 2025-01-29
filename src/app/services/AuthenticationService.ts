import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationService {
    private apiUrl = environment.url + "/auth";

    constructor(private http: HttpClient) { }

    public login(credentials: any) {
      return this.http.post(this.apiUrl + "/login", credentials, {responseType: 'text'});
    }

    public signin(credentials: any) {
      return this.http.post(this.apiUrl + "/signin", credentials, {responseType: 'text'});
    }

    public retrieveCurrentUserData() {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
      return this.http.get(this.apiUrl + "/current-user", {headers});
    }

    public retrieveCurrentUserDataResponse() {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString());
      return this.http.get(this.apiUrl + "/current-user", {headers, observe: 'response'});
    }

    // public async isLoggedIn() {
    //   if (localStorage.getItem('token') == null || localStorage.getItem('user') == null)
    //     return false;

    //   let isLoggedIn = true;
      
    //   await this.retrieveCurrentUserDataResponse().subscribe(response => {
    //     console.log(response);
    //     if (response.status !== 200) {
    //       isLoggedIn = false;
    //     }
    //     else {
    //       localStorage.setItem('user', JSON.stringify(response.body));
    //       isLoggedIn = true;
    //     }
    //   });

    //   return isLoggedIn;
    // }

    public async isLoggedIn(): Promise<boolean> {
      if (localStorage.getItem('token') == null || localStorage.getItem('user') == null)
        return false;

      try {
        const response = await firstValueFrom(this.retrieveCurrentUserDataResponse());
    
        if (response.status !== 200) {
          return false;
        } else {
          localStorage.setItem('user', JSON.stringify(response.body));
          return true;
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
        return false;
      }
    }
  }