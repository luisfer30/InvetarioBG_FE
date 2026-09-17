import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  correo = '';
  password = '';

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';

    if (!this.correo || !this.password) {
      this.errorMessage = 'Ingrese correo y contraseña.';
      return;
    }

    this.loading = true;

    this.authService.login(this.correo, this.password)
      .subscribe({
        next: response => {

          this.loading = false;

          if (response.success) {
            this.router.navigate(['/products']);
          } else {
            this.errorMessage = response.message;
          }
        },

        error: error => {

          this.loading = false;

          console.error(error);

          this.errorMessage = 'Correo o contraseña incorrectos.';
        }
      });
  }
}