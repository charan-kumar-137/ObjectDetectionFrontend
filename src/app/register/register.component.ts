import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert/alert.service';
import { AuthenticationService } from '../service/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormBuilder().group({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private authService: AuthenticationService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const email = this.registerForm.value.email || '';
      const name = this.registerForm.value.name || '';
      const password = this.registerForm.value.password || '';

      this.authService
        .register(email, password, name)
        .forEach((resp) => {
          this.alert.openSnackBar('User created');
          this.router.navigate(['/login']);
        })
        .catch((err) => {
          const error = err.error;
          this.alert.openSnackBar(
            error.detail || error.email || error.name || error.password
          );
        });
    }
  }
}
