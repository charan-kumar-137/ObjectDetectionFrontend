import { AuthenticationService } from './../service/auth/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private auth: AuthenticationService) {
    this.isLoggedIn = this.auth.getAccess() === null ? false : true;
    console.log(this.isLoggedIn);
  }

  ngOnInit(): void {}

  handleLogout(): void {
    console.log(1)
    this.auth.logout();
  }
}
