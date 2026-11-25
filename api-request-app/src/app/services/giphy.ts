import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Gif {
  id: string;
  title: string;
  url: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

@Injectable({ providedIn: 'root' })
export class Giphy {
  gifs = signal<Gif[]>([]);
  cargando = signal(false);
  error = signal('');

  async buscar(termino: string) {
    this.cargando.set(true);
    this.error.set('');
    try {
      const params = new URLSearchParams({
        api_key: environment.giphyApiKey,
        q: termino,
        limit: '24',
        offset: '0',
        rating: 'g',
        lang: 'es',
      });

      const res = await fetch(`${environment.giphyUrl}/search?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const respuesta = await res.json();
      this.gifs.set(respuesta.data);
    } catch (error: any) {
      this.error.set(error.message);
    } finally {
      this.cargando.set(false);
    }
  }
}