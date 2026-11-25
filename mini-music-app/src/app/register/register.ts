import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  email = signal<string>('');
  password = signal<string>('');

  private router = inject(Router);

  async handleRegister() {
    try {
      await createUserWithEmailAndPassword(auth, this.email(), this.password());
      this.router.navigate(['/panel']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}