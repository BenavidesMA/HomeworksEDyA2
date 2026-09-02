import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-formulario-contactos',
  imports: [],
  templateUrl: './formulario-contactos.html',
  styleUrl: './formulario-contactos.css',
})
export class FormularioContactos {
   @Output() addContact = new EventEmitter<any>();

  nombre: string = '';
  telefono: string = '';

  changeName(e: any) {
    this.nombre = e.target.value;
  }

  changePhone(e: any) {
    this.telefono = e.target.value;
  }

  submit() {
    if (this.nombre && this.telefono) {
      this.addContact.emit({ nombre: this.nombre, telefono: this.telefono });
      this.nombre = '';
      this.telefono = '';
    }
  }
}

