import { Component } from '@angular/core';
import { GrafoAmigos } from './grafo-amigos/grafo-amigos';

@Component({
  selector: 'app-root',
  imports: [GrafoAmigos],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}