import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.jwtService.getToken();
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    if (token) {
      headersConfig['Authorization'] = `bearer ${token}`;
    }
    const _req = req.clone({setHeaders: headersConfig});
    return next.handle(_req);
  }
}
