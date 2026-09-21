import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from '../app';

@Component({
  selector: 'app-formulario-libro',
  imports: [FormsModule],
  templateUrl: './formulario-libro.html'
})
export class FormularioLibro {
  nombre = '';
  isbn = '';
  autor = '';
  editorial = '';

  @Output() agregar = new EventEmitter<Libro>();

  agregarLibro(): void {
    if (this.nombre !== '' && this.isbn !== '' && this.autor !== '' && this.editorial !== '') {
      this.agregar.emit({ nombre: this.nombre, isbn: this.isbn, autor: this.autor, editorial: this.editorial });
      this.nombre = '';
      this.isbn = '';
      this.autor = '';
      this.editorial = '';
    }
  }
}