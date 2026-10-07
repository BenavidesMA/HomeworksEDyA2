import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';

  entrar() {
    if (this.email === 'user@mail.com' && this.password === '123') {
      this.auth.entrar(this.email);
      this.router.navigate(['/inicio']);
    } else {
      this.error = 'Email o contraseña incorrectos';
    }
  }
}