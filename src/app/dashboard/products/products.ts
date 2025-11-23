import { Component } from "@angular/core";
import { Producto } from "../../interfaces/producto";
import { CarritoService } from "../../services/carrito-service";
@Component({
  selector: "app-products",
  imports: [],
  templateUrl: "./products.html",
})
export class Products {
  constructor(private carritoService: CarritoService) {}
  productos: Producto[] = [
    {
      id: 1,
      nombre: "Chifle Clásico",
      descripcion: "Tradicional, crocante y con sal fina",
      precio: 3.5,
      imagen: "https://via.placeholder.com/250?text=Chifle+Clasico",
      stock: 14
    },
    {
      id: 2,
      nombre: "Chifle Picante",
      descripcion: "Crocante con toque de ají peruano 🔥",
      precio: 4.0,
      imagen: "https://via.placeholder.com/250?text=Chifle+Picante",
      stock:20
    },
    {
      id: 3,
      nombre: "Chifle con Limón",
      descripcion: "Sabor refrescante y ligero 🍋",
      precio: 4.5,
      imagen: "https://via.placeholder.com/250?text=Chifle+Limon",
      stock:11
    },
    {
      id: 4,
      nombre: "Chifle Familiar",
      descripcion: "Bolsa grande ideal para compartir",
      precio: 8.0,
      imagen: "https://via.placeholder.com/250?text=Chifle+Familiar",
      stock: 30
    },
  ];
  agregar(producto: any) {
    this.carritoService.addProduct(producto);
    alert(`${producto.nombre} agregado al carrito`);
  }
}
