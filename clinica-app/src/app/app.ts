import { Component, signal } from '@angular/core';

import { GestionPacientes } from './gestion-pacientes/gestion-pacientes';
import { HistorialAtencion } from './historial-atencion/historial-atencion';
import { RotacionMedicos } from './rotacion-medicos/rotacion-medicos';
import { ComiteAdmin } from './comite-admin/comite-admin';
import { ListaPacientes } from './gestion-pacientes/lista-pacientes';
import { ListaHistorial } from './historial-atencion/lista-historial';
import { ListaMedicos } from './rotacion-medicos/lista-medicos';
import { ListaComite } from './comite-admin/lista-comite';

@Component({
  selector: 'app-root',
  imports: [GestionPacientes, HistorialAtencion, RotacionMedicos, ComiteAdmin],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  listaPacientes = new ListaPacientes();
  listaHistorial = new ListaHistorial();
  listaMedicos = new ListaMedicos();
  listaComite = new ListaComite();

  pacientes = signal<string[]>([]);
  historial = signal<string[]>([]);
  medicoActual = signal<string>('Sin médicos');
  medicos = signal<string[]>([]);
  miembroActual = signal<string>('Sin miembros');
  miembros = signal<string[]>([]);

  constructor() {
    this.listaPacientes.agregar('Miguel Ángel');
    this.listaPacientes.agregar('Laura Sofia');
    this.listaPacientes.agregar('Jonathan');

    this.listaMedicos.agregar('Dr. Benavides');
    this.listaMedicos.agregar('Dra. Valencia');
    this.listaMedicos.agregar('Dr. Guillermo');

    this.listaComite.agregar('Director Cirugía');
    this.listaComite.agregar('Jefe de Enfermería');
    this.listaComite.agregar('Coordinador de Emergencias');

    this.actualizarEstado();

    setInterval(() => {
      this.listaMedicos.rotar();
      this.actualizarEstado(); }, 10000);
  }

  agregarPaciente(nombre: string) {
    this.listaPacientes.agregar(nombre);
    this.actualizarEstado();
  }

  atenderPaciente() {
    const nombreAtendido = this.listaPacientes.atenderPrimero();

    if (nombreAtendido !== null) {
      this.listaHistorial.agregar(nombreAtendido);
    }

    this.actualizarEstado();
  }

  agregarMedico(nombre: string) {
    this.listaMedicos.agregar(nombre);
    this.actualizarEstado();
  }

  rotarMedicoManual() {
    this.listaMedicos.rotar();
    this.actualizarEstado();
  }

  agregarMiembro(nombre: string) {
    this.listaComite.agregar(nombre);
    this.actualizarEstado();
  }

  siguienteMiembro() {
    this.listaComite.siguienteMiembro();
    this.actualizarEstado();
  }

  anteriorMiembro() {
    this.listaComite.anteriorMiembro();
    this.actualizarEstado();
  }

  actualizarEstado() {
    this.pacientes.set(this.listaPacientes.listar());
    this.historial.set(this.listaHistorial.listarInverso());
    this.medicoActual.set(this.listaMedicos.medicoActual());
    this.medicos.set(this.listaMedicos.listar());
    this.miembroActual.set(this.listaComite.miembroActual());
    this.miembros.set(this.listaComite.listar());
  }
}