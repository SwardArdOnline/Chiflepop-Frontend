import { Component, OnInit, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { CarritoService } from "../../services/carrito-service";

import { CartItem } from "../../interfaces/cartItem";
import { CuentaBancaria } from "../../interfaces/cuentaBancaria";
import { CuentaService } from "../../services/cuenta-service";
import { DireccionService } from "../../services/direccion-service";
import { PedidoService } from "../../services/pedido-service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./checkout.html",
  styleUrls: ["./checkout.css"],
})
export class Checkout implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  showPaymentModal = false;
  showAddressModal = false;

  cuentas: CuentaBancaria[] = [];
  direcciones: any[] = [];

  selectedCuenta: CuentaBancaria | null = null;
  selectedDireccion: any | null = null;

  isLoading = false;
  nuevaDireccion = {
    direccion: "",
    ciudad: "Lima",
    departamento: "Lima",
    pais: "Perú",
    referencia: "",
  };
  showCreateAddressModal = false;
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
    const userId = Number(localStorage.getItem("userId"));
    if (!userId) return;
    this.cuentaService.getMisCuentas(userId).subscribe((data) => {
      this.cuentas = data;
      this.selectedCuenta = this.cuentas.find((c) => c.esPrincipal) || null;
    });

    this.direccionService.getMisDirecciones(userId).subscribe((data) => {
      this.direcciones = data;
      this.selectedDireccion =
        this.direcciones.find((d) => d.esPrincipal) ||
        this.direcciones[0] ||
        null;
    });
  }

  async pagar() {
    if (!this.selectedCuenta || !this.selectedDireccion) {
      alert("⚠ Por favor selecciona una dirección y un método de pago.");
      return;
    }
    this.isLoading = true;
    const userId = Number(localStorage.getItem("userId"));
    console.log("Cuenta ID:", this.selectedCuenta.id);
    console.log("Dirección ID:", this.selectedDireccion.direccionEntregaId);
    console.log("Producto Ejemplo:", this.cartItems[0]?.product);
    const compraRequest = {
      direccionEntregaId: this.selectedDireccion.direccionEntregaId,
      cuentaClienteId: this.selectedCuenta.id,
      productos: this.cartItems.map((item) => {
        return {
          productoId: item.product.productoId,
          cantidad: item.quantity,
        };
      }),
    };

    console.log("Enviando JSON:", compraRequest);

    this.pedidoService.crearPedido(userId, compraRequest).subscribe({
      next: (res) => {
        alert("¡Pedido realizado con éxito!");
        this.cartService.clear();
        this.router.navigate(["/dashboard/home"]);
      },
      error: (err) => {
        console.error(err);
        alert("Error: " + (err.error || "No se pudo procesar el pago"));
        this.isLoading = false;
      },
    });
  }

  guardarDireccion() {
    const userId = Number(localStorage.getItem("userId"));

    this.direccionService
      .crearDireccion(userId, this.nuevaDireccion)
      .subscribe({
        next: (dirCreada) => {
          alert("¡Dirección guardada!");
          this.direcciones.push(dirCreada);
          this.selectedDireccion = dirCreada;
          this.closeCreateAddressModal();
          this.nuevaDireccion = {
            direccion: "",
            ciudad: "Lima",
            departamento: "Lima",
            pais: "Perú",
            referencia: "",
          };
        },
        error: (err) => alert("Error al guardar dirección"),
      });
  }
  openCreateAddressModal() {
    this.showCreateAddressModal = true;
    this.closeAddressModal();
  }
  closeCreateAddressModal() {
    this.showCreateAddressModal = false;
  }
  openPaymentModal() {
    this.showPaymentModal = true;
  }
  closePaymentModal() {
    this.showPaymentModal = false;
  }
  selectCuenta(c: CuentaBancaria) {
    this.selectedCuenta = c;
    this.closePaymentModal();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.showCreateAddressModal) {
      this.closeCreateAddressModal();
    } else if (this.showAddressModal) {
      this.closeAddressModal();
    } else if (this.showPaymentModal) {
      this.closePaymentModal();
    }
  }

  openAddressModal() {
    this.showAddressModal = true;
  }
  closeAddressModal() {
    this.showAddressModal = false;
  }
  selectDireccion(d: any) {
    this.selectedDireccion = d;
    this.closeAddressModal();
  }
}
