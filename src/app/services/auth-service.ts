import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/login`, { email, password }).pipe(
      tap(response => {
        if (response.clienteId && response.rol) {
          localStorage.setItem('userId', response.clienteId.toString());
          localStorage.setItem('userRole', response.rol);
        }
      })
    );
  }

  register(nombre: string, email: string, password: string, telefono: string): Observable<any> {
    return this.httpClient.post(`${this.url}/registro`, { nombre, email, password, telefono });
  }

  logout() { localStorage.clear(); }
  isLoggedIn(): boolean { return !!localStorage.getItem('userId'); }
  isAdmin(): boolean { return localStorage.getItem('userRole') === 'ROLE_ADMIN'; }
}