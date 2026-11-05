import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Producto {
  name: string;
  popularity: number;
}

class Node {
  value: string | null;
  isEndOfWord: boolean;
  popularity: number;
  children: { [caracter: string]: Node };

  constructor(value: string | null) {
    this.value = value;
    this.isEndOfWord = false;
    this.popularity = 0;
    this.children = {};
  }
}

class MinHeap {
  heap: Producto[];

  constructor(initial: Producto[] = []) {
    this.heap = [];

    if (initial.length > 0) {
      this.heap = [...initial];
      this.heapify();
    }
  }

  push(value: Producto) {
    this.heap.push(value);
    this.percolateUp();
  }

  pop() {
    if (this.heap.length === 0) return undefined;

    const n = this.heap.length;
    this.swap(0, n - 1);

    const min = this.heap.pop();
    this.percolateDown(0);

    return min;
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

      const minChild =
        right < this.heap.length && this.heap[right].popularity < this.heap[left].popularity
          ? right
          : left;

      if (this.heap[minChild].popularity < this.heap[curr].popularity) {
        this.swap(curr, minChild);
        curr = minChild;
      } else {
        break;
      }
    }
  }

  percolateUp() {
    let curr = this.heap.length - 1;

    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);

      if (this.heap[curr].popularity < this.heap[parent].popularity) {
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

class Trie {
  root: Node;

  constructor() {
    this.root = new Node(null);
  }

  insert(word: string, popularity: number) {
    let current = this.root;

    for (const character of word) {
      if (current.children[character] === undefined) {
        current.children[character] = new Node(character);
      }

      current = current.children[character];
    }

    current.isEndOfWord = true;
    current.popularity = popularity;
  }

  search(word: string) {
    let current = this.root;

    for (const character of word) {
      if (current.children[character] === undefined) {
        return false;
      }

      current = current.children[character];
    }

    return current.isEndOfWord;
  }

  findPrefix(prefix: string) {
    let current = this.root;

    for (const character of prefix) {
      if (current.children[character] === undefined) {
        return undefined;
      }

      current = current.children[character];
    }

    return current;
  }

  collectWords(node: Node, path: string, words: Producto[]) {
    if (node.isEndOfWord) {
      words.push({ name: path, popularity: node.popularity });
    }

    for (const character in node.children) {
      this.collectWords(node.children[character], path + character, words);
    }
  }

  searchTopK(prefix: string, k: number) {
    const start = this.findPrefix(prefix);
    if (start === undefined) return [];

    const words: Producto[] = [];
    this.collectWords(start, prefix, words);

    const heap = new MinHeap();
    for (const word of words) {
      heap.push(word);

      if (heap.size() > k) {
        heap.pop();
      }
    }

    const result: Producto[] = [];
    while (heap.size() > 0) {
      result.unshift(heap.pop()!);
    }

    return result;
  }

  printTrie() {
    const words: Producto[] = [];
    this.collectWords(this.root, '', words);
    console.log(words);
  }
}

@Component({
  selector: 'app-buscador',
  imports: [FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.scss',
})
export class Buscador {
  trie = new Trie();
  resultados = signal<Producto[]>([]);
  total = signal<number>(0);
  buscado = signal<boolean>(false);

  nombre = '';
  popularidad: number | null = null;
  prefijo = '';
  k = 3;
  msg = '';

  constructor() {
    this.trie.insert('air max', 90);
    this.trie.insert('air force', 95);
    this.trie.insert('air jordan', 85);
    this.trie.insert('adidas boost', 80);

    this.total.set(4);
    this.trie.printTrie();
  }

  agregarProducto() {
    const nombre = this.nombre.trim().toLowerCase();
    const popularidad = this.popularidad;

    if (nombre === '' || popularidad === null) {
      this.msg = 'Completa nombre y popularidad';
      return;
    }

    if (popularidad < 0 || popularidad > 100) {
      this.msg = 'La popularidad debe estar entre 0 y 100';
      return;
    }

    if (this.trie.search(nombre)) {
      this.msg = 'Ya existe un producto con ese nombre';
      return;
    }

    this.trie.insert(nombre, popularidad);
    this.trie.printTrie();

    this.total.set(this.total() + 1);
    this.nombre = '';
    this.popularidad = null;
    this.msg = 'Producto agregado';

    if (this.buscado()) {
      this.buscar();
    }
  }

  buscar() {
    const prefijo = this.prefijo.trim().toLowerCase();

    if (prefijo === '') {
      this.resultados.set([]);
      this.buscado.set(false);
      return;
    }

    this.resultados.set(this.trie.searchTopK(prefijo, this.k));
    this.buscado.set(true);
  }
}
