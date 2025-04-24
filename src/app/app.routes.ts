import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { ServicesRequestsHistoryComponent } from './services-requests-history/services-requests-history.component';
import { CheckoutRequestComponent } from './checkout-request/checkout-request.component';
export const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'home',component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'services-requests-history', component: ServicesRequestsHistoryComponent},
  {path:'checkout-request', component: CheckoutRequestComponent},
  {path:'**', redirectTo: 'home'}
];


