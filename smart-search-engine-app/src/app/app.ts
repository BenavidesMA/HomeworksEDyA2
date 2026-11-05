import { Component } from '@angular/core';
import { Buscador } from './buscador/buscador';

@Component({
  selector: 'app-root',
  imports: [Buscador],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
