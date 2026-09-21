import { Component } from '@angular/core';
import { FormularioPersona } from './formulario-persona/formulario-persona';
import { ListaPersonas } from './lista-personas/lista-personas';

export interface Persona {
  nombre: string;
  montoRetiro: number;
  fechaLlegada: Date;
}

@Component({
  selector: 'app-root',
  imports: [FormularioPersona, ListaPersonas],
  templateUrl: './app.html'
})

export class App {
  personas: Persona[] = [];

  constructor() {
    this.personas.push({ nombre: 'Juan Pérez', montoRetiro: 200000, fechaLlegada: this.generarFechaAleatoria() });
    this.personas.push({ nombre: 'María Gómez', montoRetiro: 150000, fechaLlegada: this.generarFechaAleatoria() });
    this.personas.push({ nombre: 'Carlos Ruiz', montoRetiro: 300000, fechaLlegada: this.generarFechaAleatoria() });
    this.ordenarPersonas();
  }

  generarFechaAleatoria(): Date {
    const inicio = new Date(2026, 0, 1).getTime();
    const fin = new Date(2026, 11, 31).getTime();
    return new Date(inicio + Math.random() * (fin - inicio));
  }

  ordenarPersonas(): void {
    this.personas.sort((a, b) => a.fechaLlegada.getTime() - b.fechaLlegada.getTime());
  }

  agregarPersona(datos: { nombre: string, montoRetiro: number }): void {
    this.personas.push({
      nombre: datos.nombre,
      montoRetiro: datos.montoRetiro,
      fechaLlegada: this.generarFechaAleatoria()
    });
    this.ordenarPersonas(); 
  }

  atenderPersona(): void {
    this.personas.shift(); 
  }
}