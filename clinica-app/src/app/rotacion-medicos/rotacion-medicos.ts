import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rotacion-medicos',
  imports: [],
  templateUrl: './rotacion-medicos.html',
  styleUrl: './rotacion-medicos.css',
})
export class RotacionMedicos {
  @Input() medicoActual: string = '';
  @Input() medicos: string[] = [];
  @Output() agregarMedico = new EventEmitter<string>();
  @Output() rotarManual = new EventEmitter<void>();

  nombreNuevo: string = '';

  cambiarNombre(evento: any) {
    this.nombreNuevo = evento.target.value;
  }

  agregar() {
    if (this.nombreNuevo !== '') {
      this.agregarMedico.emit(this.nombreNuevo);
      this.nombreNuevo = '';
    }
  }

  rotar() {
    this.rotarManual.emit();
  }
}
