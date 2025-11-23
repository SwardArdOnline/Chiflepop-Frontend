import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) { }

  getStats(clienteId: number): Observable<any> {
    return this.http.get(`${this.url}/stats?clienteId=${clienteId}`);
  }
}