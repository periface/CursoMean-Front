import { Router } from '@angular/router';
import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtService } from '../core/services/jwt.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  title = '';
  isSignUp: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.title = this.router.url === '/signup' ? 'Sign Up' : 'Log In';
    this.isSignUp = this.router.url === '/signup';
  }
  reset() {
    this.authForm.reset();
  }
  goToSignUp() {
    this.router.navigate(['/signup']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  onSubmit() {
    this.authService.login(this.authForm.value).subscribe(
      response => {
        if (!response.success) {
          alert('Usuario/Contraseña no validos');
        } else {
          this.jwtService.setToken(response.token);
          this.router.navigate(['dashboard']);
        }
      },
      data => {
        alert('Usuario/Contraseña no validos');
        console.log(data.error);
      }
    );
  }
  private initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
