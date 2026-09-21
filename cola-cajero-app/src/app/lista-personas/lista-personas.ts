import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Persona } from '../app';

@Component({
  selector: 'app-lista-personas',
  imports: [CommonModule],
  templateUrl: './lista-personas.html'
})
export class ListaPersonas {
  @Input() personas: Persona[] = [];
  @Output() atender = new EventEmitter<void>();
}