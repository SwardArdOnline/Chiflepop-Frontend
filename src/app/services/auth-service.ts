import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080/auth';
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<any>(`${this.url}/login`, { email, password }).pipe(
      tap(response => this.saveSession(response))
    );
  }

  register(nombre: string, email: string, password: string) {
    return this.httpClient.post(`${this.url}/registro`, { nombre, email, password });
  }

  private saveSession(data: any) {
    if (data.clienteId) localStorage.setItem('userId', data.clienteId);
    if (data.rol) localStorage.setItem('userRole', data.rol);
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'ROLE_ADMIN';
  }
  
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}
