import { NodoMiembro } from './nodo-miembro';

export class ListaComite {
  cabeza: NodoMiembro | null = null;
  cola: NodoMiembro | null = null;
  actual: NodoMiembro | null = null;

  agregar(valor: string) {
    const nuevoNodo = new NodoMiembro(valor);

    if (this.cabeza === null) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = nuevoNodo;
      nuevoNodo.siguiente = nuevoNodo;
      nuevoNodo.anterior = nuevoNodo;
    } else {
      if (this.cola !== null) {
        this.cola.siguiente = nuevoNodo;
        nuevoNodo.anterior = this.cola;
      }
      nuevoNodo.siguiente = this.cabeza;
      if (this.cabeza !== null) {
        this.cabeza.anterior = nuevoNodo;
      }
      this.cola = nuevoNodo;
    }
  }

  siguienteMiembro() {
    if (this.actual !== null) {
      this.actual = this.actual.siguiente;
    }
  }

  anteriorMiembro() {
    if (this.actual !== null) {
      this.actual = this.actual.anterior;
    }
  }

  miembroActual(): string {
    if (this.actual === null) {
      return 'Sin miembros';
    } else {
      return this.actual.valor;
    }
  }

  listar(): string[] {
    const resultado: string[] = [];

    if (this.cabeza === null) {
      return resultado;
    }

    let actual: NodoMiembro = this.cabeza;
    let esPrimero = true;

    while (esPrimero === true || actual !== this.cabeza) {
      resultado.push(actual.valor);
      esPrimero = false;

      if (actual.siguiente !== null) {
        actual = actual.siguiente;
      }
    }

    return resultado;
  }
}