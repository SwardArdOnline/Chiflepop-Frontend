import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DireccionService {
  private url = 'http://localhost:8080/api/direcciones';
  constructor(private http: HttpClient) {}

  getMisDirecciones(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}?clienteId=${clienteId}`);
  }
}