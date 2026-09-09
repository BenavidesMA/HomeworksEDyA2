import { NodoPaciente } from './nodo-paciente';

export class ListaPacientes {
  cabeza: NodoPaciente | null = null;
  cola: NodoPaciente | null = null;

  agregar(valor: string) {
    const nuevoNodo = new NodoPaciente(valor);

    if (this.cabeza === null) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
    } else {
      if (this.cola !== null) {
        this.cola.siguiente = nuevoNodo;
      }
      this.cola = nuevoNodo;
    }
  }

  atenderPrimero(): string | null {
    if (this.cabeza === null) {
      return null;
    }

    const nombreAtendido = this.cabeza.valor;
    this.cabeza = this.cabeza.siguiente;

    if (this.cabeza === null) {
      this.cola = null;
    }

    return nombreAtendido;
  }

  listar(): string[] {
    const resultado: string[] = [];
    let actual = this.cabeza;

    while (actual !== null) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }

    return resultado;
  }
}