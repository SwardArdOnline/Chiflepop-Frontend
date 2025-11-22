import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito-service';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {
  carrito: any[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carrito = this.carritoService.getCart();
    this.total = this.carritoService.getTotal();
  }

  eliminar(id: number) {
    this.carritoService.removeProduct(id);
    this.cargarCarrito();
  }

  vaciar() {
    this.carritoService.clear();
    this.cargarCarrito();
  }
}
