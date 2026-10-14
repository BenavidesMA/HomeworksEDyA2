import { Injectable } from '@angular/core';
import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase.config';
import { AuthService } from './auth.service';

export class Nodo {
  id = '';
  nombre = '';
  tipo = '';
  idPadre = '';
  correo = '';
  hijos: Nodo[] = [];
}

export class ArbolNario {
  raiz = new Nodo();

  constructor() {
    this.raiz.id = 'raiz';
    this.raiz.nombre = 'Mi unidad';
    this.raiz.tipo = 'carpeta';
  }
  
  buscar(id: string, actual: Nodo): Nodo {
    if (actual.id == id) {
      return actual;
    }
    for (let hijo of actual.hijos) {
      const encontrado = this.buscar(id, hijo);
      if (encontrado.id != '') {
        return encontrado;
      }
    }
    return new Nodo();
  }

  agregar(nuevo: Nodo) {
    const padre = this.buscar(nuevo.idPadre, this.raiz);
    if (padre.id == '') {
      return false;
    }
    if (padre.tipo == 'archivo') {
      return false;
    }
    padre.hijos.push(nuevo);
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class ArbolService {
  estructura = new ArbolNario();
  idSeleccionado = 'raiz';

  constructor(private auth: AuthService) {}

  nombreSeleccionado() {
    return this.estructura.buscar(this.idSeleccionado, this.estructura.raiz).nombre;
  }

  async cargar() {
    const nueva = new ArbolNario();
    const consulta = query(collection(db, 'nodos'), orderBy('fecha'));
    const resultado = await getDocs(consulta);

    resultado.forEach((documento) => {
      const datos = documento.data();
      const nodo = new Nodo();
      nodo.id = documento.id;
      nodo.nombre = datos['nombre'];
      nodo.tipo = datos['tipo'];
      nodo.idPadre = datos['idPadre'];
      nodo.correo = datos['correo'];
      nueva.agregar(nodo);
    });

    this.estructura = nueva;
    this.idSeleccionado = 'raiz';
  }


  async crear(nombre: string, tipo: string, idPadre: string) {
    if (this.auth.estaRegistrado() == false) {
      return 'Debes iniciar sesión para crear';
    }
    if (nombre.trim() == '') {
      return 'Escribe un nombre';
    }
    const padre = this.estructura.buscar(idPadre, this.estructura.raiz);
    if (padre.id == '') {
      return 'La carpeta no existe';
    }
    if (padre.tipo == 'archivo') {
      return 'Un archivo no puede tener hijos';
    }

    const datos = {
      nombre: nombre.trim(),
      tipo: tipo,
      idPadre: idPadre,
      correo: this.auth.obtenerCorreo(),
      fecha: Date.now()
    };
    const referencia = await addDoc(collection(db, 'nodos'), datos);

    const nodo = new Nodo();
    nodo.id = referencia.id;
    nodo.nombre = datos.nombre;
    nodo.tipo = datos.tipo;
    nodo.idPadre = datos.idPadre;
    nodo.correo = datos.correo;
    this.estructura.agregar(nodo);
    return '';
  }
}