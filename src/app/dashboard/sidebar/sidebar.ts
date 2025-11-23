import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  imports: [],
  templateUrl: "./sidebar.html",
})
export class Sidebar {
  sidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
  irAInicio() {
    this.router.navigate(["/dashboard"]);
    this.closeSidebar();
  }

  irAProductos() {
    this.router.navigate(["/dashboard/products"]);
    this.closeSidebar();
  }

  irABancos() {
    this.router.navigate(["/dashboard/bank-accounts"]);
    this.closeSidebar();
  }

  cerrarSesion() {
    this.router.navigate(["/login"]);
    this.closeSidebar();
  }
}