import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Giphy } from '../services/giphy';

@Component({
  selector: 'app-buscador-gifs',
  imports: [FormsModule],
  templateUrl: './buscador-gifs.html',
  styleUrl: './buscador-gifs.scss',
})
export class BuscadorGifs {
  protected srv = inject(Giphy);

  termino = '';
  msg = '';
  buscado = false;

  async buscar() {
    if (this.termino.trim() === '') {
      this.msg = 'Escribe algo para buscar';
      return;
    }

    this.msg = '';
    this.buscado = true;
    await this.srv.buscar(this.termino.trim());
  }
}