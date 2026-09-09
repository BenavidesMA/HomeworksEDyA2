import { NodoCancion } from './nodo-cancion';

export class ListaCanciones {
  cabeza: NodoCancion | null = null;
  cola: NodoCancion | null = null;
  actual: NodoCancion | null = null; 

  agregar(valor: string) {
    const nuevoNodo = new NodoCancion(valor);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = nuevoNodo;
    } else {
      this.cola!.siguiente = nuevoNodo;
      this.cola = nuevoNodo;
    }
  }

  avanzar() {
  if (this.actual !== null && this.actual.siguiente !== null) {
    this.actual = this.actual.siguiente;
  }
}

  haySiguiente(): boolean {
  if (this.actual !== null && this.actual.siguiente !== null) {
    return true;
  } else {
    return false;
  }}
}