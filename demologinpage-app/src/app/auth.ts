import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  usuario = signal<string | null>(null);

  estaLogueado() {
    return this.usuario() !== null;
  }

  entrar(nombre: string) {
    this.usuario.set(nombre);
  }

  salir() {
    this.usuario.set(null);
  }
}