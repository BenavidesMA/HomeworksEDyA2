import { NodoMedico } from './nodo-medico';

export class ListaMedicos {
  cabeza: NodoMedico | null = null;
  cola: NodoMedico | null = null;
  actual: NodoMedico | null = null;

  agregar(valor: string) {
    const nuevoNodo = new NodoMedico(valor);

    if (this.cabeza === null) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = nuevoNodo;
      nuevoNodo.siguiente = nuevoNodo;
    } else {
      if (this.cola !== null) {
        this.cola.siguiente = nuevoNodo;
      }
      nuevoNodo.siguiente = this.cabeza;
      this.cola = nuevoNodo;
    }
  }

  rotar() {
    if (this.actual !== null) {
      this.actual = this.actual.siguiente;
    }
  }

  medicoActual(): string {
    if (this.actual === null) {
      return 'Sin médicos';
    } else {
      return this.actual.valor;
    }
  }

  listar(): string[] {
    const resultado: string[] = [];

    if (this.cabeza === null) {
      return resultado;
    }

    let actual: NodoMedico = this.cabeza;
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