import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl: String;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8000/auth';
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(this.baseUrl + '/token/create', {
        username: email,
        password: password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('access_token', user.access);
          localStorage.setItem('refresh_token', user.refresh);
          return user;
        })
      );
  }

  getAccess(): string | null {
    return localStorage.getItem('access_token');
  }

  register(email: String, password: String, name: String) {
    return this.http.post<any>(this.baseUrl + '/user/create', {
      email: email,
      password: password,
      first_name: name,
    });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
