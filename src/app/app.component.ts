import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServicesRequestsHistoryComponent } from './services-requests-history/services-requests-history.component';
import { CheckoutRequestComponent } from './checkout-request/checkout-request.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavComponent,FooterComponent,
    CheckoutRequestComponent,NotificationComponent,NotificationDetailsComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sanayii';
}import { NotificationComponent } from './notification/notification.component';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';

