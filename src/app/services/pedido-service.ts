import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class PedidoService {
  private url = "http://localhost:8080/api/pedidos";
  constructor(private http: HttpClient) {}

  crearPedido(clienteId: number, compraRequest: any): Observable<any> {
    return this.http.post(
      `${this.url}/comprar?clienteId=${clienteId}`,
      compraRequest
    );
  }
  getMisPedidos(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.url}/mis-pedidos?clienteId=${clienteId}`
    );
  }

  getPedidoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
}
