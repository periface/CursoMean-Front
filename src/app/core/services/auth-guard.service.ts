import { JwtService } from './jwt.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private jwtService: JwtService, private router: Router) {}
  canActivate(): boolean {
    const token = this.jwtService.getToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
