import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {

  iniciarSesion(correo: string, clave: string) {
    return signInWithEmailAndPassword(auth, correo, clave);
  }

    registrar(correo: string, clave: string) {
    return createUserWithEmailAndPassword(auth, correo, clave);
  }
  
  cerrarSesion() {
    return signOut(auth);
  }

  esperarSesion() {
    return auth.authStateReady();
  }

  estaRegistrado() {
    return auth.currentUser != null;
  }

  obtenerCorreo() {
    if (auth.currentUser == null) {
      return '';
    }
    if (auth.currentUser.email == null) {
      return '';
    }
    return auth.currentUser.email;
  }
}