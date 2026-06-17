import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  acceptTerms = false;

  constructor(private router: Router, private authService: AuthService) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      return;
    }

    if (!this.acceptTerms) {
      return;
    }
    
    this.isLoading = true;
    
    this.authService.register(this.name, this.email, this.password, this.phone).subscribe({
      next: (response: any) => {
        alert('Cuenta creada con éxito. ¡Ahora inicia sesión!');
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        this.isLoading = false;
        alert('Error al registrar. El correo podría estar en uso.');
      }
    });
  }
}
