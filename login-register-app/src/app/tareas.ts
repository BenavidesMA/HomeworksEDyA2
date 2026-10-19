import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore';

export interface Tarea {
  id?: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Tareas {
  private firestore = new FirestoreService<Tarea>().init('tareas');

  lista = this.firestore.results;
  cargando = this.firestore.isPending;

  async cargar() {
    await this.firestore.getAll();
  }

  buscar(id: string | undefined) {
    for (const tarea of this.lista()) {
      if (tarea.id === id) {
        return tarea;
      }
    }
    return null;
  }

  async crear(titulo: string, descripcion: string) {
    await this.firestore.add({ titulo: titulo, descripcion: descripcion, completada: false });
    await this.firestore.getAll();
  }

  async editar(id: string, titulo: string, descripcion: string) {
    await this.firestore.update(id, { titulo: titulo, descripcion: descripcion });
    await this.firestore.getAll();
  }

  async cambiarEstado(tarea: Tarea) {
    if (tarea.id === undefined) {
      return;
    }
    await this.firestore.update(tarea.id, { completada: !tarea.completada });
    await this.firestore.getAll();
  }

  async eliminar(id: string) {
    await this.firestore.remove(id);
    await this.firestore.getAll();
  }
}