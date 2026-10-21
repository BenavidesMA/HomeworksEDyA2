import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Auth } from '../services/auth';
import { Supabase } from '../services/supabase';
import { Tareas as TareasService } from '../services/tareas';

@Component({
  selector: 'app-tareas',
  imports: [FormsModule, RouterLink],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas implements OnInit, OnDestroy {

  protected srv = inject(TareasService);
  private sb = inject(Supabase).client;
  private auth = inject(Auth);
  private router = inject(Router);
  private canal?: RealtimeChannel;

  tareas = signal<any[]>([]);
  nueva = '';

  async ngOnInit() {
    await this.cargar();
    this.canal = this.srv.escuchar(() => this.cargar());
  }
  async cargar() {
    const { data } = await this.srv.listar();
    this.tareas.set(data ?? []);
  }
  async agregar() {
    await this.srv.crear(this.nueva);
    this.nueva = '';
  }
  async completar(id: number, valor: boolean) {
    await this.srv.completar(id, valor);
  }
  async borrar(id: number) {
    await this.srv.borrar(id);
  }
  async salir() {
    await this.auth.salir();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.canal)
      this.sb.removeChannel(this.canal);
  }
}
