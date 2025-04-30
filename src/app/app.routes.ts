import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { ServicesRequestsHistoryComponent } from './services-requests-history/services-requests-history.component';
import { CheckoutRequestComponent } from './checkout-request/checkout-request.component';
import { CategoriesComponent } from './categories/categories.component';

import { NotificationComponent } from './notification/notification.component';
import { ServiceRequestDetailsComponent } from './service-request-details/service-request-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { ServicePaymentComponent } from './service-payment/service-payment.component';
import { SuccessfulPaymentComponent } from './successful-payment/successful-payment.component';
import { FailedPaymentComponent } from './failed-payment/failed-payment.component';
import { ChatComponent } from './chat/chat.component';
import { ArtsinComponent } from './artsin/artsin.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { DiscountHistoryComponent } from './discount-history/discount-history.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'home', component: HomeComponent },
  {path:'register', component: RegisterComponent},
  {path:'login',component:LoginComponent},

  {path:'services-requests-history', component: ServicesRequestsHistoryComponent},
  {path:'payment-history', component: PaymentHistoryComponent},
  {path:'checkout-request', component: CheckoutRequestComponent},
  {path:'categories',component:CategoriesComponent},

  {path:'services-requests-datails',component:ServiceRequestDetailsComponent},

  {path: 'notify', component: NotificationComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'edit-profile/:id', component: EditProfileComponent},
  {path: 'artsin', component:ArtsinComponent},

  {path:'notFound', component: NotFoundComponent},

  {path:'service-payment', component: ServicePaymentComponent },
  {path:'payment-success',component: SuccessfulPaymentComponent},
  {path:'payment-failed',component: FailedPaymentComponent},
  {path: 'discount-history/:id', component:DiscountHistoryComponent},
  {path: 'artsin/:id', component:ArtsinComponent},
  {path:'**', redirectTo: 'notFound'}

];


