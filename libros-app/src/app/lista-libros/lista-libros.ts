import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../app';

@Component({
  selector: 'app-lista-libros',
  imports: [CommonModule],
  templateUrl: './lista-libros.html'
})
export class ListaLibros {
  @Input() libros: Libro[] = [];
  @Output() sacar = new EventEmitter<void>();
}