import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServicesRequestsHistoryComponent } from './services-requests-history/services-requests-history.component';
import { CheckoutRequestComponent } from './checkout-request/checkout-request.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavComponent,FooterComponent,NotFoundComponent,
    ServicesRequestsHistoryComponent,CategoriesComponent,CheckoutRequestComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sanayii';
}
