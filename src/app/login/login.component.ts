import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert/alert.service';
import { AuthenticationService } from '../service/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormBuilder().group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private authService: AuthenticationService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email || '';
      const password = this.loginForm.value.password || '';
      this.authService
        .login(email, password)
        .forEach((resp) => {
          // console.log(resp)
          this.alert.openSnackBar('Login Success');
          this.router.navigate([''])
        })
        .catch((err) => {
          this.alert.openSnackBar(err.error.detail);
        });
    }
  }
}
