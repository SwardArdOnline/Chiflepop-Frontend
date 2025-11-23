import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CuentaBancaria } from "../../interfaces/cuentaBancaria";
import { CuentaService } from "../../services/cuenta-service";

@Component({
  selector: "app-accounts",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./accounts.html",
})
export class Accounts implements OnInit {
  cuentas: CuentaBancaria[] = [];
  loading = true;
  showModal = false;

  nuevaCuenta = {
    bancoId: 1,
    metodoPagoId: 1,
    numeroCuenta: "",
    saldoInicial: 0,
  };

  bancos = [
    { id: 1, nombre: "BCP" },
    { id: 2, nombre: "Interbank" },
    { id: 3, nombre: "BBVA" },
    { id: 4, nombre: "Banco de la Nación" },
  ];

  constructor(private cuentaService: CuentaService) {}

  ngOnInit() {
    this.cargarCuentas();
  }

  cargarCuentas() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.cuentaService.getMisCuentas(Number(userId)).subscribe({
        next: (data) => {
          this.cuentas = data;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    }
  }

  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  formatCardNumber(event: any) {
    let input = event.target.value.replace(/\D/g, "");

    input = input.substring(0, 16);

    const formatted = input.match(/.{1,4}/g)?.join(" ") || input;

    this.nuevaCuenta.numeroCuenta = formatted;
    event.target.value = formatted;
  }
  guardarCuenta() {
    const userId = Number(localStorage.getItem('userId'));
    
    if (!this.nuevaCuenta.numeroCuenta || this.nuevaCuenta.numeroCuenta.length < 19) {
      alert("El número de tarjeta debe tener 16 dígitos");
      return;
    }
    
    const cuentaParaEnviar = {
      ...this.nuevaCuenta,
      numeroCuenta: this.nuevaCuenta.numeroCuenta.replace(/\s/g, ''),
      saldoInicial: 100
    };
    this.cuentaService.crearCuenta(userId, cuentaParaEnviar).subscribe({
      next: (cuentaCreada) => {
        alert("¡Cuenta agregada con éxito! Se te asignaron S/ 100.00 de regalo de bienvenida.");
        this.cuentas.push(cuentaCreada);
        this.closeModal();
        this.nuevaCuenta = { bancoId: 1, metodoPagoId: 1, numeroCuenta: '', saldoInicial: 100 };
      },
      error: (err) => alert("Error al guardar cuenta")
    });
  }
  
}
