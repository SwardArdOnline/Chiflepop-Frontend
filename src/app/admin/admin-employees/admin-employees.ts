import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-admin-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-employees.html'
})
export class AdminEmployees implements OnInit {
  empleados: any[] = [];
  showModal = false;
  isEditing = false;

  currentEmp: any = { nombre: '', cargo: 'Vendedor', fechaIngreso: '' };

  constructor(private adminService: AdminService) {}

  ngOnInit() { this.loadEmpleados(); }

  loadEmpleados() {
    this.adminService.getEmpleados().subscribe(data => this.empleados = data);
  }

  openModal() {
    this.isEditing = false;
    this.currentEmp = { nombre: '', cargo: 'Vendedor', fechaIngreso: new Date().toISOString().split('T')[0] };
    this.showModal = true;
  }

  editEmpleado(emp: any) {
    this.isEditing = true;
    this.currentEmp = { ...emp };
    this.showModal = true;
  }

  deleteEmpleado(emp: any) {
    if(confirm(`¿Despedir a ${emp.nombre}?`)) {
      this.adminService.deleteEmpleado(emp.empleadoId).subscribe(() => this.loadEmpleados());
    }
  }

  saveEmpleado() {
    if (this.isEditing) {
      this.adminService.updateEmpleado(this.currentEmp.empleadoId, this.currentEmp).subscribe(() => {
        this.closeModal();
        this.loadEmpleados();
      });
    } else {
      this.adminService.createEmpleado(this.currentEmp).subscribe(() => {
        this.closeModal();
        this.loadEmpleados();
      });
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.showModal) {
      this.closeModal();
    }
  }

  closeModal() { this.showModal = false; }
}
