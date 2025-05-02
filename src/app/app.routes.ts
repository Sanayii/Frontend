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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmEmailRegisterComponent } from './confirm-email-register/confirm-email-register.component';
import { ExternalLoginCallbackComponent } from './external-login-callback/external-login-callback.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'home', component: HomeComponent },
  {path:'register', component: RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'change-password',component:ChangePasswordComponent},
  {path:'forgot-password',component:ForgetPasswordComponent},
  {path:'confirm-email',component:ConfirmEmailComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'confirm-email-register',component: ConfirmEmailRegisterComponent},
  { path: 'external-login-callback', component: ExternalLoginCallbackComponent },

  {path:'services-requests-history', component: ServicesRequestsHistoryComponent},
  {path:'payment-history', component: PaymentHistoryComponent},
  {path:'checkout-request', component: CheckoutRequestComponent},
  {path:'categories',component:CategoriesComponent},

  {path:'services-requests-datails',component:ServiceRequestDetailsComponent},

  {path: 'notify', component: NotificationComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'edit-profile/:id', component: EditProfileComponent},

  {path:'notFound', component: NotFoundComponent},

  {path:'service-payment', component: ServicePaymentComponent },
  {path:'payment-success',component: SuccessfulPaymentComponent},
  {path:'payment-failed',component: FailedPaymentComponent},
  {path: 'discount-history/:id', component:DiscountHistoryComponent},
  {path: 'artsin/:id', component:ArtsinComponent},
  {path:'**', redirectTo: 'notFound'}

];


