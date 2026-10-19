import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  email = signal<string>('');
  password = signal<string>('');

  private auth = inject(Auth);
  private router = inject(Router);

  async handleRegister() {
    try {
      await this.auth.registrar(this.email(), this.password());
      this.router.navigate(['/tareas']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}