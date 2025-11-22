import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { CarritoService } from "../../services/carrito-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  imports: [],
  templateUrl: "./cart.html",
  styleUrl: "./cart.css",
})
export class Cart {
  @Input() disableAutoClose: boolean = false;
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  constructor(public cartService: CarritoService, private router: Router) {}

  toggleSidebar() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }

  closeSidebar() {
    this.open = false;
    this.openChange.emit(this.open);
  }
  removeItem(index: number) {
    this.cartService.removeProduct(index);
  }

  clearCart() {
    this.cartService.clear();
  }
  submitCart() {
    this.closeSidebar();
    this.router.navigate(["/dashboard/checkout"]);
  }
  @HostListener("document:click", ["$event"])
  handleClickOutside(event: Event) {
    if (this.disableAutoClose) return;

    const sidebar = document.querySelector(".sidebar");
    const cartBtn = document.querySelector(".cart-btn");

    if (!sidebar || !cartBtn) return;

    const clickedInsideSidebar = sidebar.contains(event.target as Node);
    const clickedCartButton = cartBtn.contains(event.target as Node);

    if (this.open && !clickedInsideSidebar && !clickedCartButton) {
      this.closeSidebar();
    }
  }
}
