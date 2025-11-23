import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaBancaria } from '../../interfaces/cuentaBancaria';
import { CuentaService } from '../../services/cuenta-service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.html',
})
export class Accounts implements OnInit {
  cuentas: CuentaBancaria[] = [];
  loading = true;

  constructor(private cuentaService: CuentaService) {}

  ngOnInit() {
    this.cargarCuentas();
  }

  cargarCuentas() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.cuentaService.getMisCuentas(Number(userId)).subscribe({
        next: (data) => {
          this.cuentas = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar cuentas', err);
          this.loading = false;
        }
      });
    }
  }
}