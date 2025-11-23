import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CuentaBancaria } from '../interfaces/cuentaBancaria';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private url = 'http://localhost:8080/api/cuentas';

  constructor(private http: HttpClient) { }

  getMisCuentas(clienteId: number): Observable<CuentaBancaria[]> {
    return this.http.get<CuentaBancaria[]>(`${this.url}?clienteId=${clienteId}`);
  }
}