import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  // Datos simulados para la vista
  userName = 'Juan Diego'; // Podrías traerlo de un servicio de auth
  stats = [
    { title: 'Pedidos Realizados', value: '12', icon: '📦', color: 'bg-blue-100 text-blue-600' },
    { title: 'Chifles Favoritos', value: 'Picante', icon: '🌶️', color: 'bg-red-100 text-red-600' },
    { title: 'Puntos Acumulados', value: '350', icon: '⭐', color: 'bg-yellow-100 text-yellow-600' },
  ];
}