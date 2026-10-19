import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { ListaTareas } from './lista-tareas/lista-tareas';
import { Createtask } from './createtask/createtask';
import { Edittask } from './edittask/edittask';
import { Deletetask } from './deletetask/deletetask';
import { authGuard } from './auth-guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'tareas', component: ListaTareas, canActivate: [authGuard] },
  { path: 'createtask', component: Createtask, canActivate: [authGuard] },
  { path: 'edittask/:id', component: Edittask, canActivate: [authGuard] },
  { path: 'deletetask/:id', component: Deletetask, canActivate: [authGuard] },
  { path: '**', redirectTo: 'tareas' },
];