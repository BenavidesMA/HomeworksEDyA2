import { Component, Input } from '@angular/core';
import { ArbolService, Nodo } from './arbol.service';

@Component({
  selector: 'app-nodo',
  templateUrl: './nodo.component.html',
  styleUrl: './nodo.component.scss'
})
export class NodoComponent {
  @Input() nodo: Nodo = new Nodo();

  constructor(public arbol: ArbolService) {}

  seleccionar() {
    if (this.nodo.tipo == 'carpeta') {
      this.arbol.idSeleccionado = this.nodo.id;
    }
  }
}