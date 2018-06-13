import { Router } from '@angular/router';
import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtService } from '../core/services/jwt.service';
import { User } from '../core/models/user';

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
    console.log(this.isSignUp);
    if (this.isSignUp === true) {
      this.authService.signUp(this.authForm.value).subscribe(
        data => {
          if (data.success) {
            const {email, password} = this.authForm.value;
            const user: User = {email, password};
            this.authService.login(user).subscribe(response => {
              this.jwtService.setToken(response.token);
              this.router.navigate(['dashboard']);
            });
          }
        },
        err => {
          alert(err);
        }
      );
    } else {
      const {email, password} = this.authForm.value;
      const user: User = {email, password};
      this.authService.login(user).subscribe(
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
  }
  googleAuthHandler() {
    this.authService.googleAuth().subscribe(data => {
      console.log(data);
    }, error => console.log(error));
  }
  private initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['']
    });
  }
}
