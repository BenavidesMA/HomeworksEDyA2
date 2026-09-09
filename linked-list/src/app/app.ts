import { Component, signal } from '@angular/core';
import { PlaylistCanciones } from './playlist-canciones/playlist-canciones';
import { PaginasNavegador } from './paginas-navegador/paginas-navegador';

@Component({
  selector: 'app-root',
  imports: [PlaylistCanciones, PaginasNavegador],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  vista = signal<'playlist' | 'navegador'>('playlist');

  mostrarPlaylist() {
    this.vista.set('playlist');
  }

  mostrarNavegador() {
    this.vista.set('navegador');
  }
}