import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from '../../../core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  constructor(private jwtService: JwtService, private router: Router) {}

  ngOnInit() {}
  logOut() {
    this.jwtService.destroyToken();
    this.router.navigate(['login']);
  }
}
