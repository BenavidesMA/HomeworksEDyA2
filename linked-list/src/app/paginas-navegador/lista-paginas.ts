import { NodoPagina } from './nodo-pagina';

export class ListaPaginas {
  cabeza: NodoPagina | null = null;
  cola: NodoPagina | null = null;
  actual: NodoPagina | null = null;

  agregar(valor: string) {
    const nuevoNodo = new NodoPagina(valor);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = nuevoNodo;
    } else {
      this.cola!.siguiente = nuevoNodo;
      nuevoNodo.anterior = this.cola;
      this.cola = nuevoNodo;
    }
  }

  irAtras() {
    if(this.actual !== null && this.actual.anterior !== null) {
      this.actual = this.actual.anterior;
    }
  }

  irAdelante() {
    if (this.actual !== null && this.actual.siguiente !== null) {
      this.actual = this.actual.siguiente;
    }
  }

  hayAnterior(): boolean {
    if (this.actual !== null && this.actual.anterior !== null) {
      return true;
    } else {
      return false;
    }
  }

  haySiguiente(): boolean {
    if (this.actual !== null && this.actual.siguiente !== null) {
      return true;
    } else {
      return false;
    }
  }
}