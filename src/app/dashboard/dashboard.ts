import { Component, HostListener } from "@angular/core";
import { Sidebar } from "./sidebar/sidebar";
import { RouterOutlet } from "@angular/router";
import { Cart } from "./cart/cart";
import { CarritoService } from "../services/carrito-service";

@Component({
  selector: "app-dashboard",
  imports: [Sidebar, RouterOutlet, Cart],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class Dashboard {
  open:boolean = false;
  constructor(public cartService: CarritoService) {}

  toggleSidebar() {
    this.open = !this.open;
  }
}
