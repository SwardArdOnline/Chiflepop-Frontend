import { Component, OnInit } from "@angular/core";
import { Producto } from "../../interfaces/producto";
import { CarritoService } from "../../services/carrito-service";
import { CommonModule } from "@angular/common";
import { ProductoService } from "../../services/producto-service";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./products.html",
  styleUrls: ["./products.css"]
})
export class Products implements OnInit {
  productos: Producto[] = [];
  loading = true;

  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }

  agregar(producto: Producto) {
    this.carritoService.addProduct(producto);
    alert(`¡${producto.nombre} agregado!`);
  }
}