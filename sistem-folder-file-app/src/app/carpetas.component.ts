import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ArbolService } from './arbol.service';
import { NodoComponent } from './nodo.component';

@Component({
  selector: 'app-carpetas',
  imports: [FormsModule, NodoComponent],
  templateUrl: './carpetas.component.html',
  styleUrl: './carpetas.component.scss'
})
export class CarpetasComponent implements OnInit {
  nombre = '';
  tipo = 'carpeta';
  mensaje = '';
  correo = '';

  constructor(
    public arbol: ArbolService,
    private auth: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.auth.esperarSesion();
    if (this.auth.estaRegistrado() == false) {
      this.router.navigate(['/login']);
      return;
    }
    this.correo = this.auth.obtenerCorreo();
    await this.arbol.cargar();
  }

  async crear() {
    this.mensaje = await this.arbol.crear(this.nombre, this.tipo, this.arbol.idSeleccionado);
    if (this.mensaje == '') {
      this.nombre = '';
    }
  }

  async salir() {
    await this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
