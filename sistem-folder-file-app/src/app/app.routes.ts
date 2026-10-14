import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { CarpetasComponent } from './carpetas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'carpetas', component: CarpetasComponent }
];