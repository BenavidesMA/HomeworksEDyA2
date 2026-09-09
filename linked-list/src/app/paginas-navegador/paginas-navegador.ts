import { Component, signal } from '@angular/core';
import { ListaPaginas } from './lista-paginas';

@Component({
  selector: 'app-paginas-navegador',
  imports: [],
  templateUrl: './paginas-navegador.html',
  styleUrl: './paginas-navegador.css',
})
export class PaginasNavegador {
  lista = new ListaPaginas();
  paginaActual = signal<string>('');
  hayAnterior = signal<boolean>(false);
  haySiguiente = signal<boolean>(false);

  constructor() {

    this.lista.agregar('Inicio');
    this.lista.agregar('Productos');
    this.lista.agregar('Carrito');
    this.lista.agregar('Pago');

    this.lista.actual = this.lista.cabeza;
    this.lista.irAdelante();
    this.lista.irAdelante();

    this.actualizarEstado();
  }

  atras() {
    this.lista.irAtras();
    this.actualizarEstado();
  }

  adelante() {
    this.lista.irAdelante();
    this.actualizarEstado();
  }

  actualizarEstado() {
    let textoPagina: string;

    if (this.lista.actual !== null) {
      textoPagina = this.lista.actual.valor;
    } else {
      textoPagina = 'No hay páginas';
    }

    this.paginaActual.set(textoPagina);
    this.hayAnterior.set(this.lista.hayAnterior());
    this.haySiguiente.set(this.lista.haySiguiente());
  }
}