import { Component } from '@angular/core';
import { MenuLateral } from './menu-lateral/menu-lateral';

@Component({
  selector: 'app-root',
  imports: [MenuLateral],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}