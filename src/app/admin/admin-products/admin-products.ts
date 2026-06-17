import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.html'
})
export class AdminProducts implements OnInit {
  productos: any[] = [];
  showModal = false;
  isEditing = false;

  currentProduct: any = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
  };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.adminService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (e) => console.error('Error cargando productos', e)
    });
  }

  openModal() {
    this.isEditing = false;
    this.currentProduct = { nombre: '', descripcion: '', precio: 0, stock: 0,imagen: '' };
    this.showModal = true;
  }

  editProduct(prod: any) {
    this.isEditing = true;
    this.currentProduct = { ...prod, id: prod.id || prod.productoId }; 
    this.showModal = true;
  }

  deleteProduct(prod: any) {
    const id = prod.id || prod.productoId;
    if(confirm(`¿Estás seguro de eliminar "${prod.nombre}"?`)) {
      this.adminService.deleteProducto(id).subscribe({
        next: () => {
          alert('Producto eliminado');
          this.loadProducts();
        },
        error: () => alert('No se pudo eliminar (puede que tenga pedidos asociados)')
      });
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.showModal) {
      this.closeModal();
    }
  }

  closeModal() {
    this.showModal = false;
  }

  saveProduct() {
    if (this.isEditing) {
      this.adminService.updateProducto(this.currentProduct.id, this.currentProduct).subscribe({
        next: () => {
          alert('Producto actualizado');
          this.closeModal();
          this.loadProducts();
        },
        error: (e) => alert('Error al actualizar')
      });
    } else {
      this.adminService.createProducto(this.currentProduct).subscribe({
        next: () => {
          alert('Producto creado');
          this.closeModal();
          this.loadProducts();
        },
        error: (e) => alert('Error al crear')
      });
    }
  }
}
