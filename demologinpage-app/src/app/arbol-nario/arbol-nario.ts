import { Component, signal } from '@angular/core';

interface ItemMenu {
  titulo: string;
  enlace: string;
  componente: string;
}

class Nodo {
  valor: ItemMenu;
  hijos: Nodo[];
  abierto: boolean;

  constructor(valor: ItemMenu) {
    this.valor = valor;
    this.hijos = [];
    this.abierto = true;
  }

  agregarHijo(nodo: Nodo) {
    this.hijos.push(nodo);
  }
}

@Component({
  selector: 'app-arbol-nario',
  imports: [],
  templateUrl: './arbol-nario.html',
  styleUrl: './arbol-nario.css',
})
export class ArbolNarioComponent {
  raiz = new Nodo({ titulo: 'Inicio', enlace: '/', componente: 'Inicio' });
  seleccionado = signal<ItemMenu>(this.raiz.valor);

  constructor() {
    const perfil = new Nodo({ titulo: 'Profile', enlace: '/profile', componente: 'Profile' });
    const mensajes = new Nodo({ titulo: 'Messages', enlace: '/messages', componente: 'Messages' });

    const ajustes = new Nodo({ titulo: 'Settings', enlace: '/settings', componente: 'Settings' });
    ajustes.agregarHijo(new Nodo({ titulo: 'Account', enlace: '/settings/account', componente: 'Account' }));
    ajustes.agregarHijo(new Nodo({ titulo: 'Profile', enlace: '/settings/profile', componente: 'SettingsProfile' }));
    ajustes.agregarHijo(new Nodo({ titulo: 'Security & Privacy', enlace: '/settings/security', componente: 'Security' }));
    ajustes.agregarHijo(new Nodo({ titulo: 'Password', enlace: '/settings/password', componente: 'Password' }));
    ajustes.agregarHijo(new Nodo({ titulo: 'Notification', enlace: '/settings/notification', componente: 'Notification' }));

    const ayuda = new Nodo({ titulo: 'Help', enlace: '/help', componente: 'Help' });
    ayuda.agregarHijo(new Nodo({ titulo: "FAQ's", enlace: '/help/faqs', componente: 'Faqs' }));
    ayuda.agregarHijo(new Nodo({ titulo: 'Submit a Ticket', enlace: '/help/ticket', componente: 'Ticket' }));
    ayuda.agregarHijo(new Nodo({ titulo: 'Network Status', enlace: '/help/network', componente: 'Network' }));

    const salir = new Nodo({ titulo: 'Logout', enlace: '/logout', componente: 'Logout' });

    this.raiz.agregarHijo(perfil);
    this.raiz.agregarHijo(mensajes);
    this.raiz.agregarHijo(ajustes);
    this.raiz.agregarHijo(ayuda);
    this.raiz.agregarHijo(salir);
  }

  alternarMenu(nodo: Nodo) {
    if (nodo.abierto === true) {
      nodo.abierto = false;
    } else {
      nodo.abierto = true;
    }
  }

  seleccionar(item: ItemMenu) {
    this.seleccionado.set(item);
  }

  obtenerClase(item: ItemMenu, base: string) {
    if (this.seleccionado().enlace === item.enlace) {
      return base + ' activo';
    } else {
      return base;
    }
  }

  
}