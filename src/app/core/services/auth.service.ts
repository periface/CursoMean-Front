import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/loginResponse';
import { SignupResponse } from '../models/signupResponse';

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
  signUp(body: User): Observable<SignupResponse> {
    return this.httpClient.post<SignupResponse>(
      `${environment.api_url}/users/signup`,
      body
    );
  }
  googleAuth(): Observable<LoginResponse> {
    return this.httpClient.get<LoginResponse>(`${environment.api_url}/auth/google`);
  }
  isAuthenticated(token: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      })
    };
    return this.httpClient.get<boolean>(`${environment.api_url}/auth/authenticate`, httpOptions);

  }
}
