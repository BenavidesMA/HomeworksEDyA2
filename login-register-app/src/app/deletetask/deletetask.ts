import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Tareas } from '../tareas';

@Component({
  selector: 'app-deletetask',
  imports: [RouterLink],
  templateUrl: './deletetask.html',
  styleUrl: './deletetask.scss',
})
export class Deletetask implements OnInit {
  id = input<string>();
  titulo = signal<string>('');

  private tareas = inject(Tareas);
  private router = inject(Router);

  ngOnInit() {
    this.cargarTarea();
  }

  async cargarTarea() {
    await this.tareas.cargar();
    const tarea = this.tareas.buscar(this.id());
    if (tarea !== null) {
      this.titulo.set(tarea.titulo);
    }
  }

  async handleDelete() {
    const id = this.id();
    if (id === undefined) {
      return;
    }

    try {
      await this.tareas.eliminar(id);
      this.router.navigate(['/tareas']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}