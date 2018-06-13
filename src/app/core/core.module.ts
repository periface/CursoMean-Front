import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [AuthService, JwtService, HttpInterceptorService, AuthGuardService]
})
export class CoreModule {}
