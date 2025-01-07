import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  }