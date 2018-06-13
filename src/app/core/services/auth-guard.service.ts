import { map, catchError } from 'rxjs/internal/operators';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  CanActivateChild,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = this.jwtService.getToken();
    if (token) {
      return of(true);
    } else {
      const jwtToken = activatedRouteSnapshot.queryParamMap.get('token');
      if (jwtToken) {
        return this.authService.isAuthenticated(jwtToken).pipe(map(authenticated => {
            if (authenticated === true) {
              this.jwtService.setToken(jwtToken);
              return true;
            }
            this.router.navigate(['/login']);
            return false;
        }), catchError(error => {
          this.router.navigate(['/login']);
          return of(false);
        }));
      } else {
        this.router.navigate(['/login']);
        return of(false);
      }
    }
  }
  canActivateChild(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(activatedRouteSnapshot, state);
  }
}
