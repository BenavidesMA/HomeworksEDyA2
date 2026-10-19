import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = signal<string>('');
  password = signal<string>('');

  private auth = inject(Auth);
  private router = inject(Router);

  async handleLogin() {
    try {
      await this.auth.entrar(this.email(), this.password());
      this.router.navigate(['/tareas']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}