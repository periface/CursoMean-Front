import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  login(body: User): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${environment.api_url}/users/login`,
      body
    );
  }
  signUp(body: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.api_url}/users/signup`,
      body
    );
  }
}
