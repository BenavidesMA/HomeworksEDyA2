import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { FirestoreService } from '../services/firestore';

interface Cancion {
  id?: string;
  titulo: string;
  artista: string;
  genero: string;
  reproducciones: number;
}

class Node {
  value: string | null;
  isEndOfWord: boolean;
  children: { [clave: string]: Node };

  constructor(value: string | null) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = {};
  }
}

class Trie {
  root: Node;

  constructor() {
    this.root = new Node(null);
  }

  insert(word: string) {
    let current = this.root;

    for (let character of word) {
      if (current.children[character] === undefined) {
        current.children[character] = new Node(character);
      }

      current = current.children[character];
    }
    current.isEndOfWord = true;
  }

  search(word: string) {
    let current = this.root;
    for (let character of word) {
      if (current.children[character] === undefined) {
        return false;
      }
      current = current.children[character];
    }
    return current.isEndOfWord;
  }

  sugerencias(prefix: string) {
    const resultado: string[] = [];
    let current = this.root;

    for (let character of prefix) {
      if (current.children[character] === undefined) {
        return resultado;
      }
      current = current.children[character];
    }

    this.recolectar(current, prefix, resultado);
    return resultado;
  }

  recolectar(node: Node, palabra: string, resultado: string[]) {
    if (node.isEndOfWord) {
      resultado.push(palabra);
    }
    for (let character in node.children) {
      this.recolectar(node.children[character], palabra + character, resultado);
    }
  }
}

class MaxHeap {
  heap: Cancion[];

  constructor(initial: Cancion[] = []) {
    this.heap = [];

    if (initial.length > 0) {
      this.heap = [...initial];
      this.heapify();
    }
  }

  push(value: Cancion) {
    this.heap.push(value);
    this.percolateUp();
  }

  pop() {
    if (this.heap.length === 0) return undefined;

    const n = this.heap.length;
    this.swap(0, n - 1);

    const max = this.heap.pop();
    this.percolateDown(0);

    return max;
  }

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
  }

  heapify() {
    const start = Math.floor((this.heap.length - 2) / 2);

    for (let i = start; i >= 0; i--) {
      this.percolateDown(i);
    }
  }

  percolateDown(index: number) {
    let curr = index;

    while (2 * curr + 1 < this.heap.length) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;

      const maxChild =
        right < this.heap.length && this.heap[right].reproducciones > this.heap[left].reproducciones
          ? right
          : left;

      if (this.heap[maxChild].reproducciones > this.heap[curr].reproducciones) {
        this.swap(curr, maxChild);
        curr = maxChild;
      } else {
        break;
      }
    }
  }

  percolateUp() {
    let curr = this.heap.length - 1;

    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);

      if (this.heap[curr].reproducciones > this.heap[parent].reproducciones) {
        this.swap(curr, parent);
        curr = parent;
      } else {
        break;
      }
    }
  }

  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  size() {
    return this.heap.length;
  }

  toArray() {
    return [...this.heap];
  }
}

class Graph {
  nodes: string[];
  adjList: { [clave: string]: string[] };

  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node: string) {
    if (!this.searchNode(node)) {
      this.nodes.push(node);
      this.adjList[node] = [];
    }
  }

  addEdge(node1: string, node2: string) {
    this.adjList[node1].push(node2);
    this.adjList[node2].push(node1);
  }

  searchNode(node: string) {
    if (!this.nodes.length) return undefined;
    return this.nodes.find(n => n == node);
  }

  printAdjacency(node: string) {
    if (this.searchNode(node)) {
      console.log(this.adjList[node]);
    }
  }

  printGraph() {
    console.log(this.adjList);
  }
}

@Component({
  selector: 'app-panel',
  imports: [FormsModule],
  providers: [FirestoreService],
  templateUrl: './panel.html',
  styleUrl: './panel.scss',
})
export class Panel implements OnInit {
  readonly cancionService = inject<FirestoreService<Cancion>>(FirestoreService).init('canciones');
  private router = inject(Router);

  trie = new Trie();
  grafo = new Graph();
  generos: string[] = ['Pop', 'Rock', 'Reggaetón', 'Salsa'];

  sugerencias = signal<Cancion[]>([]);
  resultadoBusqueda = signal<string>('');
  top = signal<Cancion[]>([]);
  cancionSeleccionada = signal<string>('');
  recomendaciones = signal<Cancion[]>([]);
  msg = signal<string>('');
  cancionActual = signal<Cancion | null>(null);

  busqueda = '';
  titulo = '';
  artista = '';
  genero = '';
  reproducciones: number | null = null;

  cancionesIniciales: Cancion[] = [
    { titulo: 'Shape of You', artista: 'Ed Sheeran', genero: 'Pop', reproducciones: 990 },
    { titulo: 'Blinding Lights', artista: 'The Weeknd', genero: 'Pop', reproducciones: 950 },
    { titulo: 'Levitating', artista: 'Dua Lipa', genero: 'Pop', reproducciones: 870 },
    { titulo: 'Bohemian Rhapsody', artista: 'Queen', genero: 'Rock', reproducciones: 800 },
    { titulo: 'Smells Like Teen Spirit', artista: 'Nirvana', genero: 'Rock', reproducciones: 760 },
    { titulo: 'Hotel California', artista: 'Eagles', genero: 'Rock', reproducciones: 720 },
    { titulo: 'Despacito', artista: 'Luis Fonsi', genero: 'Reggaetón', reproducciones: 1000 },
    { titulo: 'Tusa', artista: 'Karol G', genero: 'Reggaetón', reproducciones: 680 },
    { titulo: 'Vivir mi vida', artista: 'Marc Anthony', genero: 'Salsa', reproducciones: 650 },
    { titulo: 'La rebelión', artista: 'Joe Arroyo', genero: 'Salsa', reproducciones: 600 },
  ];

  async ngOnInit() {
    try {
      await this.cancionService.getAll();

      if (this.cancionService.results().length === 0) {
        for (const cancion of this.cancionesIniciales) {
          await this.cancionService.add(cancion);
        }
        await this.cancionService.getAll();
      }

      this.construirEstructuras();
    } catch (error: any) {
      this.msg.set(error.message);
    }
  }

  construirEstructuras() {
    const canciones = this.cancionService.results();

    this.trie = new Trie();
    this.grafo = new Graph();

    for (const cancion of canciones) {
      this.trie.insert(cancion.titulo.toLowerCase());
      this.grafo.addNode(cancion.titulo);
    }

    for (let i = 0; i < canciones.length; i++) {
      for (let j = i + 1; j < canciones.length; j++) {
        if (canciones[i].genero === canciones[j].genero) {
          this.grafo.addEdge(canciones[i].titulo, canciones[j].titulo);
        }
      }
    }
    this.grafo.printGraph();

    const heap = new MaxHeap(canciones);
    const lista: Cancion[] = [];

    while (lista.length < 5 && heap.size() > 0) {
      const cancion = heap.pop();
      if (cancion) {
        lista.push(cancion);
      }
    }
    this.top.set(lista);

    if (this.cancionSeleccionada() !== '') {
      this.verRecomendaciones(this.cancionSeleccionada());
    }
    this.actualizarSugerencias(this.busqueda);
  }

  obtenerCancion(titulo: string) {
    return this.cancionService.results().find(c => c.titulo.toLowerCase() == titulo.toLowerCase());
  }

  actualizarSugerencias(texto: string) {
    this.busqueda = texto;
    this.resultadoBusqueda.set('');

    if (texto.trim() === '') {
      this.sugerencias.set([]);
      return;
    }

    const titulos = this.trie.sugerencias(texto.toLowerCase());
    const lista: Cancion[] = [];

    for (const titulo of titulos) {
      const cancion = this.obtenerCancion(titulo);
      if (cancion) {
        lista.push(cancion);
      }
    }
    this.sugerencias.set(lista);
  }

  buscar() {
    const texto = this.busqueda.trim().toLowerCase();

    if (this.trie.search(texto)) {
      this.resultadoBusqueda.set('La canción sí existe');
      const cancion = this.obtenerCancion(texto);
      if (cancion) {
        this.verRecomendaciones(cancion.titulo);
      }
    } else {
      this.resultadoBusqueda.set('La canción no existe');
    }
  }

  verRecomendaciones(titulo: string) {
    this.cancionSeleccionada.set(titulo);
    this.grafo.printAdjacency(titulo);

    const lista: Cancion[] = [];

    if (this.grafo.searchNode(titulo)) {
      for (const vecino of this.grafo.adjList[titulo]) {
        const cancion = this.obtenerCancion(vecino);
        if (cancion) {
          lista.push(cancion);
        }
      }
    }
    this.recomendaciones.set(lista);
  }

  porcentaje(cancion: Cancion) {
    const lista = this.top();
    if (lista.length === 0 || lista[0].reproducciones === 0) {
      return 0;
    }
    return (cancion.reproducciones * 100) / lista[0].reproducciones;
  }

    async escuchar(cancion: Cancion) {
    if (cancion.id === undefined) {
      return;
    }

    this.cancionActual.set(cancion);

    try {
      await this.cancionService.update(cancion.id, { reproducciones: cancion.reproducciones + 1 });
      await this.cancionService.getAll();
      this.construirEstructuras();

      const actualizada = this.obtenerCancion(cancion.titulo);
      if (actualizada) {
        this.cancionActual.set(actualizada);
      }
    } catch (error: any) {
      this.msg.set(error.message);
    }
  }

  detener() {
    this.cancionActual.set(null);
  }

  async agregarCancion() {
    const titulo = this.titulo.trim();
    const artista = this.artista.trim();
    const reproducciones = this.reproducciones;

    if (titulo === '' || artista === '' || this.genero === '' || reproducciones === null) {
      this.msg.set('Completa todos los campos');
      return;
    }

    if (this.trie.search(titulo.toLowerCase())) {
      this.msg.set('Esa canción ya existe');
      return;
    }

    try {
      await this.cancionService.add({
        titulo: titulo,
        artista: artista,
        genero: this.genero,
        reproducciones: reproducciones,
      });
      await this.cancionService.getAll();
      this.construirEstructuras();

      this.titulo = '';
      this.artista = '';
      this.genero = '';
      this.reproducciones = null;
      this.msg.set('Canción agregada');
    } catch (error: any) {
      this.msg.set(error.message);
    }
  }

  async salir() {
    await signOut(auth);
    this.router.navigate(['/login']);
  }
}