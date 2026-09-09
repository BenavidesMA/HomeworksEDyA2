export class NodoCancion {
  valor: string;
  siguiente: NodoCancion | null = null;

  constructor(valor: string) {
    this.valor = valor;
  }
}