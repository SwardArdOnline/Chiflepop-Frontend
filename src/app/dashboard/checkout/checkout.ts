import { Component, HostListener } from '@angular/core';
import { CarritoService } from '../../services/carrito-service';
import { Router } from '@angular/router';
import { CartItem } from '../../interfaces/cartItem';
import { CuentaBancaria } from '../../interfaces/cuentaBancaria';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
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
    if (data) {
      const parsedData = JSON.parse(data);
      // Normalización de datos para compatibilidad
      this.cartItems = parsedData.map((item: any) => ({
        product: item.product || item.producto,
        quantity: item.quantity || item.cantidad
      }));
    } else {
      this.cartItems = [];
    }
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (acc, item) => {
        const precio = item.product?.precio || 0;
        return acc + precio * item.quantity;
      },
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

  goBack() {
    this.router.navigate(['/dashboard/products']);
  }

  pagar() {
    if (!this.selectedCuenta) {
      alert('⚠ Debes seleccionar una cuenta antes de pagar.');
      return;
    }
    alert(`💰 Pago procesado con éxito usando: ${this.selectedCuenta.banco}`);
    localStorage.removeItem('cart');
    this.router.navigate(['/dashboard']);
  }
}