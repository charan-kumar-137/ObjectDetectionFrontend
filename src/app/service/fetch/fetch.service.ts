import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  baseUrl: String;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8000/web';
  }

  get(url: string) {
    return this.http.get(this.baseUrl + url);
  }

  post(url: string, data: object) {
    return this.http.post(this.baseUrl + url, data);
  }
}
