import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Inicio } from './inicio/inicio';
import { ArbolBinarioComponent } from './arbol-binario/arbol-binario';
import { ArbolNarioComponent } from './arbol-nario/arbol-nario';
import { NoEncontrado } from './no-encontrado/no-encontrado';
import { authGuard } from './auth-guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'inicio', component: Inicio, canActivate: [authGuard] },
  { path: 'arbol-binario', component: ArbolBinarioComponent, canActivate: [authGuard] },
  { path: 'arbol-nario', component: ArbolNarioComponent, canActivate: [authGuard] },
  { path: '**', component: NoEncontrado },
];