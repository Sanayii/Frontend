import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { ServicesRequestsHistoryComponent } from './services-requests-history/services-requests-history.component';
import { CheckoutRequestComponent } from './checkout-request/checkout-request.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServicePaymentComponent } from './service-payment/service-payment.component';
import { SuccessfulPaymentComponent } from './successful-payment/successful-payment.component';
import { FailedPaymentComponent } from './failed-payment/failed-payment.component';
export const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'home',component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'services-requests-history', component: ServicesRequestsHistoryComponent},
  {path:'checkout-request', component: CheckoutRequestComponent},
  {path:'categories',component:CategoriesComponent},
  { path: 'service-payment', component: ServicePaymentComponent },
  {path:'payment-success',component: SuccessfulPaymentComponent},
  {path:'payment-failed',component: FailedPaymentComponent},
  {path:'**', redirectTo: 'home'}
];


