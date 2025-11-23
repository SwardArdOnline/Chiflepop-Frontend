import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito-service';

import { CartItem } from '../../interfaces/cartItem';
import { CuentaBancaria } from '../../interfaces/cuentaBancaria';
import { CuentaService } from '../../services/cuenta-service';
import { DireccionService } from '../../services/direccion-service';
import { PedidoService } from '../../services/pedido-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  
  // Modales
  showPaymentModal = false;
  showAddressModal = false;

  // Datos del Backend
  cuentas: CuentaBancaria[] = [];
  direcciones: any[] = [];

  // Selecciones del Usuario
  selectedCuenta: CuentaBancaria | null = null;
  selectedDireccion: any | null = null;

  isLoading = false;

  constructor(
    private cartService: CarritoService,
    private cuentaService: CuentaService,
    private direccionService: DireccionService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.loadUserData();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  loadUserData() {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return;
    this.cuentaService.getMisCuentas(userId).subscribe(data => {
      this.cuentas = data;
      this.selectedCuenta = this.cuentas.find(c => c.esPrincipal) || null;
    });

    this.direccionService.getMisDirecciones(userId).subscribe(data => {
      this.direcciones = data;
      this.selectedDireccion = this.direcciones.find(d => d.esPrincipal) || this.direcciones[0] || null;
    });
  }

  async pagar() {
    if (!this.selectedCuenta || !this.selectedDireccion) {
      alert('⚠ Por favor selecciona una dirección y un método de pago.');
      return;
    }

    this.isLoading = true;
    const userId = Number(localStorage.getItem('userId'));

    const compraRequest = {
      direccionEntregaId: this.selectedDireccion.direccionEntregaId,
      cuentaClienteId: this.selectedCuenta.id,
      productos: this.cartItems.map(item => ({
        productoId: item.product.id,
        cantidad: item.quantity
      }))
    };

    this.pedidoService.crearPedido(userId, compraRequest).subscribe({
      next: (res) => {
        alert('¡Pedido realizado con éxito!');
        this.cartService.clear();
        this.router.navigate(['/dashboard/home']);
      },
      error: (err) => {
        console.error(err);
        alert('Error: ' + (err.error || 'No se pudo procesar el pago'));
        this.isLoading = false;
      }
    });
  }

  openPaymentModal() { this.showPaymentModal = true; }
  closePaymentModal() { this.showPaymentModal = false; }
  selectCuenta(c: CuentaBancaria) { this.selectedCuenta = c; this.closePaymentModal(); }

  openAddressModal() { this.showAddressModal = true; }
  closeAddressModal() { this.showAddressModal = false; }
  selectDireccion(d: any) { this.selectedDireccion = d; this.closeAddressModal(); }
}