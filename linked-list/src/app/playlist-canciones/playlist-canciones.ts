import { Component, signal } from '@angular/core';
import { ListaCanciones } from './lista-canciones';

@Component({
  selector: 'app-playlist-canciones',
  imports: [],
  templateUrl: './playlist-canciones.html',
  styleUrl: './playlist-canciones.css',
})
export class PlaylistCanciones {
  lista = new ListaCanciones();
  cancionActual = signal<string>('');
  haySiguiente = signal<boolean>(false);

  constructor() {
   
    this.lista.agregar('Beat it - Michael Jackson');
    this.lista.agregar('Give in to me - Michael Jackson');
    this.lista.agregar('Billie Jean - Michael Jackson');
    this.lista.agregar('Dirty Diana - Michael Jackson');

    this.actualizarEstado();
  }

  siguienteCancion() {
    this.lista.avanzar();
    this.actualizarEstado();
  }

  
  actualizarEstado() {
  let textoCancion: string;

  if (this.lista.actual !== null) {
    textoCancion = this.lista.actual.valor;
  } else {
    textoCancion = 'No hay canciones';
  }

  this.cancionActual.set(textoCancion);
  this.haySiguiente.set(this.lista.haySiguiente());
}
}