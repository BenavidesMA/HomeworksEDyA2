import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Tareas } from '../tareas';

@Component({
  selector: 'app-edittask',
  imports: [FormsModule, RouterLink],
  templateUrl: './edittask.html',
  styleUrl: './edittask.scss',
})
export class Edittask implements OnInit {
  id = input<string>();
  titulo = signal<string>('');
  descripcion = signal<string>('');

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
      this.descripcion.set(tarea.descripcion);
    }
  }

  async handleEdit() {
    const id = this.id();
    if (id === undefined) {
      return;
    }

    try {
      await this.tareas.editar(id, this.titulo(), this.descripcion());
      this.router.navigate(['/tareas']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}