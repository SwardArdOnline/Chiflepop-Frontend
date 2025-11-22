import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
@Component({
  selector: "app-sidebar",
  imports: [],
  templateUrl: "./sidebar.html",
  styleUrl: "./sidebar.css",
})
export class Sidebar {
  sidebarOpen = false;
  constructor(private router: Router) {}
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  irAProductos() {
    this.router.navigate(["/dashboard/products"]);
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
  irABancos() {
    this.router.navigate(["/dashboard/bank-accounts"]);
  }
}
