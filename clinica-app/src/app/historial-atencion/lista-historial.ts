import { NodoAtencion } from './nodo-atencion';

export class ListaHistorial {
  cabeza: NodoAtencion | null = null;
  cola: NodoAtencion | null = null;

  agregar(valor: string) {
    const nuevoNodo = new NodoAtencion(valor);

    if (this.cabeza === null) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
    } else {
      if (this.cola !== null) {
        this.cola.siguiente = nuevoNodo;
        nuevoNodo.anterior = this.cola;
      }
      this.cola = nuevoNodo;
    }
  }

  listarInverso(): string[] {
    const resultado: string[] = [];
    let actual = this.cola;

    while (actual !== null) {
      resultado.push(actual.valor);
      actual = actual.anterior;
    }

    return resultado;
  }
}