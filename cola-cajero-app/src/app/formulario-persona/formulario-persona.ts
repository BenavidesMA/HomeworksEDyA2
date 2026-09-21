import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-persona',
  imports: [FormsModule],
  templateUrl: './formulario-persona.html'
})
export class FormularioPersona {
  nombre = '';
  montoRetiro = 0;

  @Output() agregar = new EventEmitter<{ nombre: string, montoRetiro: number }>();

  agregarPersona(): void {
    if (this.nombre !== '' && this.montoRetiro > 0) {
      this.agregar.emit({ nombre: this.nombre, montoRetiro: this.montoRetiro });
      this.nombre = '';
      this.montoRetiro = 0;
    }
  }
}