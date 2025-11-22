import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  features = [
    {
      icon: '🍌',
      title: 'Chifles Premium',
      description: 'Los mejores chifles ecuatorianos seleccionados para ti'
    },
    {
      icon: '🚚',
      title: 'Entrega Rápida',
      description: 'Recibe tus chifles frescos en la puerta de tu casa'
    },
    {
      icon: '⭐',
      title: 'Calidad Garantizada',
      description: 'Productos de la más alta calidad, 100% naturales'
    }
  ];

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
