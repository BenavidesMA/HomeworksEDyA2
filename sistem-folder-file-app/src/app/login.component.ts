import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  correo = '';
  clave = '';
  mensaje = '';

  constructor(private auth: AuthService, private router: Router) {}

  entrar() {
    this.auth.iniciarSesion(this.correo, this.clave)
      .then(() => {
        this.router.navigate(['/carpetas']);
      })
      .catch(() => {
        this.mensaje = 'Correo o contraseña incorrectos';
      });
  }
}