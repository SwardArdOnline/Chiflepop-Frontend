import { Component, HostListener } from '@angular/core';
import { CarritoService } from '../../services/carrito-service';
import { Router } from '@angular/router';
import { CartItem } from '../../interfaces/cartItem';
import { CuentaBancaria } from '../../interfaces/cuentaBancaria';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  cartItems: CartItem[] = [];
  total: number = 0;

  showPaymentModal: boolean = false;

  cuentas: CuentaBancaria[] = [
    { id: 1, banco: 'BCP', numero: '**** 2938', tipo: 'Débito' },
    { id: 2, banco: 'Interbank', numero: '**** 1182', tipo: 'Crédito' },
    { id: 3, banco: 'BBVA', numero: '**** 9921', tipo: 'Ahorros' },
  ];

  selectedCuenta: CuentaBancaria | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
    this.calculateTotal();
  }

  loadCart() {
    const data = localStorage.getItem('cart');
    this.cartItems = data ? JSON.parse(data) : [];
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (acc, item) => acc + item.producto.precio * item.cantidad,
      0
    );
  }

  openPaymentModal() {
    this.showPaymentModal = true;
  }

  seleccionarCuenta(cuenta: CuentaBancaria) {
    this.selectedCuenta = cuenta;
    this.closePaymentModal();
  }

  closePaymentModal() {
    this.showPaymentModal = false;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    const modal = document.querySelector('.modal-content');
    
    if (this.showPaymentModal && modal && !modal.contains(event.target as Node)) {
      this.closePaymentModal();
    }
  }

  pagar() {
    if (!this.selectedCuenta) {
      alert('⚠ Debes seleccionar una cuenta antes de pagar.');
      return;
    }

    alert(
      `💰 Pago procesado con éxito usando: ${this.selectedCuenta.banco} (${this.selectedCuenta.numero})`
    );

    localStorage.removeItem('cart');
    this.router.navigate(['/orden-confirmada']);
  }
}
