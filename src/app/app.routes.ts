import { Routes } from '@angular/router';
import { RegisterComponent } from './_component/register/register.component';
import { LoginComponent } from './_component/login/login.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent ,pathMatch:'full'},
  { path: 'register', component: RegisterComponent,pathMatch:'full' },
];


