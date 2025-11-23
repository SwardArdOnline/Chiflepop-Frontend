// src/app/services/carrito-service.ts
import { Injectable } from "@angular/core";
import { Producto } from "../interfaces/producto";

@Injectable({
  providedIn: "root",
})
export class CarritoService {
  private storageKey = 'cart';
  private cart: { product: Producto; quantity: number }[] = [];

  constructor() {
    this.loadCart();
  }

  private saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }

  private loadCart() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) this.cart = JSON.parse(stored);
  }

  getCart() {
    return this.cart;
  }

  addProduct(product: Producto) {
    const exists = this.cart.find(item => item.product.id === product.id);

    if (exists) {
      exists.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.saveCart();
  }
  removeProduct(productId: number) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  clear() {
    this.cart = [];
    this.saveCart();
  }

  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.product.precio * item.quantity, 0);
  }

  getCount(): number {
    return this.cart.length;
  }
}