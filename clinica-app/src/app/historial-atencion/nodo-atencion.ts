export class NodoAtencion {
  valor: string;
  siguiente: NodoAtencion | null = null;
  anterior: NodoAtencion | null = null;

  constructor(valor: string) {
    this.valor = valor;
  }
}