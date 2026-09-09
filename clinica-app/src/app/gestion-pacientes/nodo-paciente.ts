export class NodoPaciente {
    valor: string;
    siguiente: NodoPaciente | null = null;

    constructor(valor: string) {
        this.valor = valor;
    }
}