import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Tareas } from '../tareas';

@Component({
  selector: 'app-createtask',
  imports: [FormsModule, RouterLink],
  templateUrl: './createtask.html',
  styleUrl: './createtask.scss',
})
export class Createtask {
  titulo = signal<string>('');
  descripcion = signal<string>('');

  private tareas = inject(Tareas);
  private router = inject(Router);

  async handleCreate() {
    if (this.titulo() === '') {
      alert('Escribe un título');
      return;
    }

    try {
      await this.tareas.crear(this.titulo(), this.descripcion());
      this.router.navigate(['/tareas']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}