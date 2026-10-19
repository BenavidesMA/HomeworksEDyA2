import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';
import { Tareas, Tarea } from '../tareas';

@Component({
  selector: 'app-lista-tareas',
  imports: [RouterLink],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.scss',
})
export class ListaTareas implements OnInit {
  protected auth = inject(Auth);
  protected tareas = inject(Tareas);
  private router = inject(Router);

  ngOnInit() {
    this.tareas.cargar();
  }

  async cambiarEstado(tarea: Tarea) {
    await this.tareas.cambiarEstado(tarea);
  }

  obtenerClase(tarea: Tarea) {
    if (tarea.completada) {
      return 'text-decoration-line-through text-muted';
    } else {
      return '';
    }
  }

  async handleLogout() {
    await this.auth.salir();
    this.router.navigate(['/login']);
  }
}