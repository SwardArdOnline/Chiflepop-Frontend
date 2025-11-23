import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../interfaces/producto";

@Injectable({ providedIn: "root" })
export class AdminService {
  private url = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/productos`);
  }
  createProducto(p: any): Observable<Producto> {
    return this.http.post<Producto>(`${this.url}/productos`, p);
  }
  updateProducto(id: number, p: any): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/productos/${id}`, p);
  }
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/productos/${id}`);
  }

  // --- EMPLEADOS (NUEVO) ---
  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/empleados`);
  }
  createEmpleado(e: any): Observable<any> {
    return this.http.post<any>(`${this.url}/empleados`, e);
  }
  updateEmpleado(id: number, e: any): Observable<any> {
    return this.http.put<any>(`${this.url}/empleados/${id}`, e);
  }
  deleteEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/empleados/${id}`);
  }

  // --- CLIENTES (NUEVO) ---
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/clientes`);
  }
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/clientes/${id}`);
  }
}
