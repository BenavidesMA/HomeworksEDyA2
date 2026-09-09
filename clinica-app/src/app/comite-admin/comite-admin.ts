import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comite-admin',
  imports: [],
  templateUrl: './comite-admin.html',
  styleUrl: './comite-admin.css',
})
export class ComiteAdmin {
  @Input() miembroActual: string = '';
  @Input() miembros: string[] = [];
  @Output() agregarMiembro = new EventEmitter<string>();
  @Output() irSiguiente = new EventEmitter<void>();
  @Output() irAnterior = new EventEmitter<void>();

  nombreNuevo: string = '';

  cambiarNombre(evento: any) {
    this.nombreNuevo = evento.target.value;
  }

  agregar() {
    if (this.nombreNuevo !== '') {
      this.agregarMiembro.emit(this.nombreNuevo);
      this.nombreNuevo = '';
    }
  }

  siguiente() {
    this.irSiguiente.emit();
  }

  anterior() {
    this.irAnterior.emit();
  }
}
