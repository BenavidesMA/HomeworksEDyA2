import { Component } from '@angular/core';
import { FormularioLibro } from './formulario-libro/formulario-libro';
import { ListaLibros } from './lista-libros/lista-libros';

export interface Libro {
  nombre: string;
  isbn: string;
  autor: string;
  editorial: string;
}

@Component({
  selector: 'app-root',
  imports: [FormularioLibro, ListaLibros],
  templateUrl: './app.html'
})
export class App {
  libros: Libro[] = [
    { nombre: 'Cien años de soledad', isbn: '978-0307474728', autor: 'Gabriel García Márquez', editorial: 'Sudamericana' },
    { nombre: 'El Principito', isbn: '978-0156012195', autor: 'Antoine de Saint-Exupéry', editorial: 'Reynal & Hitchcock' },
    { nombre: 'Rayuela', isbn: '978-8437604572', autor: 'Julio Cortázar', editorial: 'Sudamericana' }
  ];

  agregarLibro(libro: Libro): void {
    this.libros.push(libro); 
  }

  sacarLibro(): void {
    this.libros.pop(); 
  }
}