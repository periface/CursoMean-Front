import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from '../../../core/services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}
  logOut() {
    const token = this.jwtService.getToken();
    this.authService.logout().subscribe(response => {
      if (response.success) {

        this.jwtService.destroyToken();
        this.router.navigate(['login']);
      }
    });
  }
}
