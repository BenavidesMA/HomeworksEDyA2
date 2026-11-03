import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';

interface Nodo {
  nombre: string;
  tipo: string;
  edad?: number;
}

class Graph {
  nodes: Nodo[];
  adjList: { [clave: string]: string[] };

  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node: Nodo) {
    if (!this.searchNode(node.nombre)) {
      this.nodes.push(node);
      this.adjList[node.nombre] = [];
    }
  }

  addEdge(node1: string, node2: string) {
    this.adjList[node1].push(node2);
    this.adjList[node2].push(node1);
  }

  searchNode(node: string) {
    if (!this.nodes.length) return undefined;
    return this.nodes.find(n => n.nombre == node);
  }

  printAdjacency(node: string) {
    if (this.searchNode(node)) {
      console.log(this.adjList[node]);
    }
  }

  isEmpty() {
    if (this.nodes.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  removeNode(node: string) {
    if (!this.searchNode(node)) return;

    this.nodes = this.nodes.filter(n => n.nombre != node);
    delete this.adjList[node];

    for (const clave in this.adjList) {
      this.adjList[clave] = this.adjList[clave].filter(v => v != node);
    }
  }

  printGraph() {
    console.log(this.adjList);
  }
}

@Component({
  selector: 'app-grafo-amigos',
  imports: [FormsModule],
  templateUrl: './grafo-amigos.html',
  styleUrl: './grafo-amigos.scss',
})
export class GrafoAmigos {
  graph = new Graph();
  ciudades: string[] = [];
  listaPersonas: string[] = [];
  ciudadActual = signal<string>('');
  personas = signal<Nodo[]>([]);
  simulacion: any;

  // Campos del formulario
  nombre = '';
  edad: number | null = null;
  ciudadNueva = '';
  amigo = '';
  msg = '';

  constructor() {
    this.graph.addNode({ nombre: 'Cali', tipo: 'ciudad' });
    this.graph.addNode({ nombre: 'Bogotá', tipo: 'ciudad' });
    this.graph.addNode({ nombre: 'Medellín', tipo: 'ciudad' });

    this.graph.addNode({ nombre: 'Ana', tipo: 'persona', edad: 25 });
    this.graph.addNode({ nombre: 'Carlos', tipo: 'persona', edad: 30 });
    this.graph.addNode({ nombre: 'Laura', tipo: 'persona', edad: 22 });
    this.graph.addNode({ nombre: 'Pedro', tipo: 'persona', edad: 28 });
    this.graph.addNode({ nombre: 'Sofía', tipo: 'persona', edad: 27 });
    this.graph.addNode({ nombre: 'Juan', tipo: 'persona', edad: 31 });

    // Cada persona vive en una ciudad
    this.graph.addEdge('Ana', 'Cali');
    this.graph.addEdge('Carlos', 'Cali');
    this.graph.addEdge('Laura', 'Bogotá');
    this.graph.addEdge('Pedro', 'Bogotá');
    this.graph.addEdge('Sofía', 'Medellín');
    this.graph.addEdge('Juan', 'Medellín');

    // Amistades
    this.graph.addEdge('Ana', 'Carlos');
    this.graph.addEdge('Ana', 'Laura');
    this.graph.addEdge('Carlos', 'Pedro');
    this.graph.addEdge('Laura', 'Sofía');
    this.graph.addEdge('Sofía', 'Juan');

    for (const nodo of this.graph.nodes) {
      if (nodo.tipo === 'ciudad') {
        this.ciudades.push(nodo.nombre);
      } else {
        this.listaPersonas.push(nodo.nombre);
      }
    }

    this.graph.printGraph();

    setTimeout(() => {
      this.dibujarGrafo();
    }, 0);
  }

  agregarPersona() {
    const nombre = this.nombre.trim();
    const edad = this.edad;

    if (nombre === '' || edad === null || this.ciudadNueva === '') {
      this.msg = 'Completa nombre, edad y ciudad';
      return;
    }

    if (this.graph.searchNode(nombre)) {
      this.msg = 'Ya existe una persona o ciudad con ese nombre';
      return;
    }

    this.graph.addNode({ nombre: nombre, tipo: 'persona', edad: edad });
    this.graph.addEdge(nombre, this.ciudadNueva);

    if (this.amigo !== '') {
      this.graph.addEdge(nombre, this.amigo);
    }

    this.listaPersonas.push(nombre);
    this.graph.printGraph();

    this.nombre = '';
    this.edad = null;
    this.ciudadNueva = '';
    this.amigo = '';
    this.msg = 'Persona agregada';

    if (this.ciudadActual() !== '') {
      this.verPersonas(this.ciudadActual());
    }

    this.dibujarGrafo();
  }

  verPersonas(ciudad: string) {
    this.graph.printAdjacency(ciudad);

    const lista: Nodo[] = [];
    for (const nombre of this.graph.adjList[ciudad]) {
      const persona = this.graph.searchNode(nombre);
      if (persona) {
        lista.push(persona);
      }
    }

    this.ciudadActual.set(ciudad);
    this.personas.set(lista);
  }

  dibujarGrafo() {
    const ancho = 700;
    const alto = 450;

    // Borra el dibujo anterior y detiene su simulación
    d3.select('#contenedor-grafo').selectAll('*').remove();
    if (this.simulacion) {
      this.simulacion.stop();
    }

    // d3 necesita copias de los nodos y una lista de enlaces (source - target)
    const nodos = this.graph.nodes.map((n) => ({ nombre: n.nombre, tipo: n.tipo }));

    const enlaces: any[] = [];
    for (const nombre of Object.keys(this.graph.adjList)) {
      for (const vecino of this.graph.adjList[nombre]) {
        if (nombre < vecino) {
          enlaces.push({ source: nombre, target: vecino });
        }
      }
    }

    const svg = d3
      .select('#contenedor-grafo')
      .append('svg')
      .attr('width', '100%')
      .attr('viewBox', '0 0 ' + ancho + ' ' + alto);

    const lineas = svg
      .append('g')
      .selectAll('line')
      .data(enlaces)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    const grupos = svg
      .append('g')
      .selectAll('g')
      .data(nodos)
      .enter()
      .append('g');

    grupos
      .append('circle')
      .attr('r', (d: any) => (d.tipo === 'ciudad' ? 28 : 20))
      .attr('fill', (d: any) => (d.tipo === 'ciudad' ? '#ff7043' : '#26a69a'));

    grupos
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', (d: any) => (d.tipo === 'ciudad' ? 44 : 36))
      .attr('font-size', 13)
      .attr('fill', '#2d3047')
      .text((d: any) => d.nombre);

    this.simulacion = d3
      .forceSimulation(nodos as any)
      .force('link', d3.forceLink(enlaces).id((d: any) => d.nombre).distance(110))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(ancho / 2, alto / 2))
      .on('tick', () => {
        // Mantiene cada nodo dentro del área visible
        for (const nodo of nodos as any[]) {
          nodo.x = Math.max(50, Math.min(ancho - 50, nodo.x));
          nodo.y = Math.max(40, Math.min(alto - 60, nodo.y));
        }

        lineas
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        grupos.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')');
      });
  }
}