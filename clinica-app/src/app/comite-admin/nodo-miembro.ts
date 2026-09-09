export class NodoMiembro {
  valor: string;
  siguiente: NodoMiembro | null = null;
  anterior: NodoMiembro | null = null;

  constructor(valor: string) {
    this.valor = valor;
  }
}