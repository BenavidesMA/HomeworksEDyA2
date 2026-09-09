import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gestion-pacientes',
  imports: [],
  templateUrl: './gestion-pacientes.html',
  styleUrl: './gestion-pacientes.css',
})
export class GestionPacientes {
  @Input() pacientes: string[] = [];
  @Output() agregarPaciente = new EventEmitter<string>();
  @Output() atenderPaciente = new EventEmitter<void>();

  nombreNuevo: string = '';

  cambiarNombre(evento: any) {
    this.nombreNuevo = evento.target.value;
  }

  agregar() {
    if (this.nombreNuevo !== '') {
      this.agregarPaciente.emit(this.nombreNuevo);
      this.nombreNuevo = '';
    }
  }

  atender() {
    this.atenderPaciente.emit();
  }
}