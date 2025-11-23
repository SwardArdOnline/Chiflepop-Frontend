import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido-service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html'
})
export class Orders implements OnInit {
  pedidos: any[] = [];
  loading = true;

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.pedidoService.getMisPedidos(userId).subscribe({
        next: (data) => {
          this.pedidos = data;
          this.loading = false;
        },
        error: (e) => this.loading = false
      });
    }
  }

  verDetalle(id: number) {
    alert(`Detalles del pedido #${id} (Implementar vista detalle)`);
  }
}