export class NodoMedico {
  valor: string;
  siguiente: NodoMedico | null = null;

  constructor(valor: string) {
    this.valor = valor;
  }
}