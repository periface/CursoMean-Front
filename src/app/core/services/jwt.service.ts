import { Injectable } from '@angular/core';
const TOKEN_LOCATION = 'jwt_token';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() {}

  setToken(token: string) {
    localStorage.setItem(TOKEN_LOCATION, token);
  }
  getToken() {
    return localStorage.getItem(TOKEN_LOCATION);
  }
  destroyToken() {
    localStorage.removeItem(TOKEN_LOCATION);
  }
}
