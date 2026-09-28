import { Component } from '@angular/core';
import { ArbolD3 } from './arbol-d3/arbol-d3';

@Component({
  selector: 'app-root',
  imports: [ArbolD3],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}