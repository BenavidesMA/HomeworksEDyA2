import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = signal<string>('');
  password = signal<string>('');

  private router = inject(Router);

  async handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, this.email(), this.password());
      this.router.navigate(['/panel']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}