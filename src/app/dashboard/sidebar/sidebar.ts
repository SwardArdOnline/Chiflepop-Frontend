import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service";

@Component({
  selector: "app-sidebar",
  imports: [],
  templateUrl: "./sidebar.html",
})
export class Sidebar {
  sidebarOpen = false;

  constructor(private router: Router, private authService: AuthService) {}

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
  irAPedidos() {
    this.router.navigate(["/dashboard/orders"]); 
    this.closeSidebar();
  }
  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(["/login"]);
    this.closeSidebar();
  }
}