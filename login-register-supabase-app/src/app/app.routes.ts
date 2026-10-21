import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Tareas } from './tareas/tareas';
import { Perfil } from './perfil/perfil';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'tareas', component: Tareas, canActivate: [authGuard] },
  { path: 'perfil', component: Perfil, canActivate: [authGuard] }
];
