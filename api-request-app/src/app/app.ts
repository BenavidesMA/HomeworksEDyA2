import { Component } from '@angular/core';
import { BuscadorGifs } from './buscador-gifs/buscador-gifs';

@Component({
  selector: 'app-root',
  imports: [BuscadorGifs],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}