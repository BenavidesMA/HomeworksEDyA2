import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Supabase } from '../services/supabase';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {

  private sb = inject(Supabase).client;
  url = signal('');

  async ngOnInit() {
    const { data: { user } } = await this.sb.auth.getUser();

    const { data } = await this.sb.storage.from('avatars')
      .list(user!.id, { sortBy: { column: 'created_at', order: 'desc' }, limit: 1 });

    if (data && data.length > 0) {
      const ruta = `${user!.id}/${data[0].name}`;
      this.url.set(this.sb.storage.from('avatars')
        .getPublicUrl(ruta).data.publicUrl);
    }
  }

  async subir(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const { data: { user } } = await this.sb.auth.getUser();

    const ruta = `${user!.id}/${Date.now()}-${file.name}`;

    const { error } = await this.sb.storage.from('avatars')
      .upload(ruta, file, { upsert: true });

    if (error)
      return alert(error.message);

    this.url.set(this.sb.storage.from('avatars')
      .getPublicUrl(ruta).data.publicUrl);
  }
}