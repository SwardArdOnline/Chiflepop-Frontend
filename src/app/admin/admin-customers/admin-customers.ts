import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-customers.html'
})
export class AdminCustomers implements OnInit {
  clientes: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getClientes().subscribe(data => this.clientes = data);
  }

  deleteCliente(cliente: any) {
    if(confirm(`¿Estás seguro de eliminar al usuario ${cliente.nombre}? Esto borrará su historial.`)) {
      this.adminService.deleteCliente(cliente.clienteId).subscribe({
        next: () => {
          alert('Cliente eliminado');
          this.ngOnInit();
        },
        error: () => alert('Error al eliminar (puede tener pedidos activos)')
      });
    }
  }
}