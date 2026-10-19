import { Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  usuario = signal<string | null>(null);

  estaLogueado() {
    return this.usuario() !== null;
  }

  async entrar(email: string, password: string) {
    const resultado = await signInWithEmailAndPassword(auth, email, password);
    this.usuario.set(resultado.user.email);
  }

  async registrar(email: string, password: string) {
    const resultado = await createUserWithEmailAndPassword(auth, email, password);
    this.usuario.set(resultado.user.email);
  }

  async salir() {
    await signOut(auth);
    this.usuario.set(null);
  }
}