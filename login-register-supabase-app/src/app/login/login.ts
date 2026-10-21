import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);
  email = ''; clave = ''; msg = signal('');

  async entrar() {
    const { error } = await this.auth
      .entrar(this.email, this.clave);
    if (error) this.msg.set(error.message);
    else this.router.navigate(['/tareas']);
  }

  async registrar() {
    const { error } = await this.auth
      .registrar(this.email, this.clave);
    this.msg.set(error?.message ?? 'Revisa tu correo');
  }
}
