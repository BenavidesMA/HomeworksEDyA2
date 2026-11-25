import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Panel } from './panel/panel';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'panel', component: Panel, canActivate: [authGuard] },
  { path: '**', redirectTo: 'panel' },
];