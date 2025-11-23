import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../services/dashboard-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  userName = 'Usuario';
  loading = true;
  
  stats = [
    { title: 'Pedidos Realizados', value: '...', icon: '📦', color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Gastado', value: '...', icon: '💰', color: 'bg-green-100 text-green-600' },
    { title: 'Último Antojo', value: '...', icon: '🍌', color: 'bg-yellow-100 text-yellow-600' },
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.dashboardService.getStats(Number(userId)).subscribe({
        next: (data: any) => {
          this.userName = data.nombreUsuario;
          this.stats[0].value = data.pedidosRealizados.toString();
          this.stats[1].value = `S/ ${data.totalGastado.toFixed(2)}`;
          this.stats[2].value = data.ultimoProductoComprado;
          
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando dashboard:', err);
          this.loading = false;
        }
      });
    }
  }
}