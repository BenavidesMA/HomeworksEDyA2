import { Component } from '@angular/core';
import * as d3 from 'd3';

class Nodo {
  valor: number;
  izquierda: Nodo | null;
  derecha: Nodo | null;

  constructor(valor: number) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }

  isLeaf() {
    if (this.izquierda === null && this.derecha === null) {
      return true;
    } else {
      return false;
    }
  }
}

class ArbolBinario {
  raiz: Nodo | null;

  constructor() {
    this.raiz = null;
  }

  insertar(valor: number) {
    const nuevoNodo = new Nodo(valor);
    if (!this.raiz) {
      this.raiz = nuevoNodo;
      return;
    }

    let actual: Nodo = this.raiz;
    while (true) {
      if (valor < actual.valor) {
        if (!actual.izquierda) {
          actual.izquierda = nuevoNodo;
          return;
        }
        actual = actual.izquierda;
      } else {
        if (!actual.derecha) {
          actual.derecha = nuevoNodo;
          return;
        }
        actual = actual.derecha;
      }
    }
  }

  preorden(nodo: Nodo | null) {
    if (!nodo) return;
    console.log(nodo.valor);
    this.preorden(nodo.izquierda);
    this.preorden(nodo.derecha);
  }

  inorden(nodo: Nodo | null) {
    if (!nodo) return;
    this.inorden(nodo.izquierda);
    console.log(nodo.valor);
    this.inorden(nodo.derecha);
  }

  postorden(nodo: Nodo | null) {
    if (!nodo) return;
    this.postorden(nodo.izquierda);
    this.postorden(nodo.derecha);
    console.log(nodo.valor);
  }

  buscar(valor: number) {
    let actual = this.raiz;
    while (actual) {
      if (valor === actual.valor) {
        return true;
      }
      if (valor < actual.valor) {
        actual = actual.izquierda;
      } else {
        actual = actual.derecha;
      }
    }
    return false;
  }
}

@Component({
  selector: 'app-arbol-binario',
  imports: [],
  templateUrl: './arbol-binario.html',
  styleUrl: './arbol-binario.css',
})
export class ArbolBinarioComponent {
  arbol = new ArbolBinario();

  constructor() {
    const numeros = [50, 30, 70, 20, 40, 60, 80, 35, 45];
    for (let numero of numeros) {
      this.arbol.insertar(numero);
    }

    console.log('Inorden:');
    this.arbol.inorden(this.arbol.raiz);
    console.log('Postorden:');
    this.arbol.postorden(this.arbol.raiz);
    console.log('Preorden:');
    this.arbol.preorden(this.arbol.raiz);

    console.log('¿Existe el 40?', this.arbol.buscar(40));
    console.log('¿Existe el 99?', this.arbol.buscar(99));

    setTimeout(() => {
      this.dibujarArbol();
    }, 0);
  }

  convertirParaD3(nodo: Nodo): any {
    const hijos: any[] = [];
    if (nodo.izquierda) {
      hijos.push(this.convertirParaD3(nodo.izquierda));
    }
    if (nodo.derecha) {
      hijos.push(this.convertirParaD3(nodo.derecha));
    }
    return { valor: nodo.valor, children: hijos };
  }

  dibujarArbol() {
    const raiz = this.arbol.raiz;
    if (raiz === null) {
      return;
    }

    const ancho = 600;
    const alto = 300;

    const jerarquia = d3.hierarchy(this.convertirParaD3(raiz));
    const disposicion = d3.tree().size([ancho - 40, alto - 40]);
    disposicion(jerarquia);

    const svg = d3
      .select('#contenedor-arbol')
      .append('svg')
      .attr('width', ancho)
      .attr('height', alto);

    const grupo = svg.append('g').attr('transform', 'translate(20, 20)');

    grupo
      .selectAll('line')
      .data(jerarquia.links())
      .enter()
      .append('line')
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)
      .attr('stroke', '#999');

    const nodos = grupo
      .selectAll('g')
      .data(jerarquia.descendants())
      .enter()
      .append('g')
      .attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')');

    nodos.append('circle').attr('r', 18).attr('fill', '#26a69a');

    nodos
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', 'white')
      .text((d: any) => d.data.valor);
  }
}