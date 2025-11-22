import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080/api/';
  constructor(private httpClient: HttpClient) { }
  login(email: string, password: string) {
    return this.httpClient.post(`${this.url}auth/login`, { email, password });
  }
  register(name: string, email: string, password: string) {
    return this.httpClient.post(`${this.url}auth/register`, { name, email, password });
  }
}
