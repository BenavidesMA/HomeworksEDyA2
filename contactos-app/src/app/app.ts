import { Component, signal } from '@angular/core';
import { FormularioContactos } from './formulario-contactos/formulario-contactos';
import { ListaContactos } from './lista-contactos/lista-contactos';

interface Contact {
  nombre: string;
  telefono: string;
}

@Component({
  selector: 'app-root',
  imports: [FormularioContactos, ListaContactos],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  load = signal<boolean>(true);
  contacts = signal<Contact[]>([]);

  constructor() {

    setTimeout(() => {
      this.contacts.set([
        { nombre: 'Miguel', telefono: '12345' },
        { nombre: 'Jonathan', telefono: '67890' },
      ]);
      this.load.set(false);
    }, 2000);
  }

  addContact(newContact: Contact) {
    this.contacts.set([...this.contacts(), newContact]);
  }

  deleteContact(index: number) {
    this.contacts.set(this.contacts().filter((_, i) => i !== index));
  }
}