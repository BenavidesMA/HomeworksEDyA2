export class NodoPagina {
  valor: string;
  siguiente: NodoPagina | null = null;
  anterior: NodoPagina | null = null;

  constructor(valor: string) {
    this.valor = valor;
  }
}