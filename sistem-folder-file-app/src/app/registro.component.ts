import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  correo = '';
  clave = '';
  repetir = '';
  mensaje = '';
  creado = false;

  constructor(private auth: AuthService) {}

  registrarse() {
    this.creado = false;

    if (this.correo.trim() == '') {
      this.mensaje = 'Escribe un correo';
      return;
    }
    if (this.clave.length < 6) {
      this.mensaje = 'La contraseña debe tener mínimo 6 caracteres';
      return;
    }
    if (this.clave != this.repetir) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }

    this.auth.registrar(this.correo, this.clave)
      .then(() => {
        return this.auth.cerrarSesion();
      })
      .then(() => {
        this.creado = true;
        this.mensaje = 'Cuenta creada. Ya puedes iniciar sesión con ese correo';
        this.clave = '';
        this.repetir = '';
      })
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use') {
          this.mensaje = 'Ese correo ya está registrado';
        } else {
          this.mensaje = 'No se pudo crear la cuenta, revisa el correo';
        }
      });
  }
}