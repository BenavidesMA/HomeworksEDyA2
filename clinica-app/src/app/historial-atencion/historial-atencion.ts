import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-historial-atencion',
  imports: [],
  templateUrl: './historial-atencion.html',
  styleUrl: './historial-atencion.css',
})
export class HistorialAtencion {
  @Input() historial: string[] = [];
}
