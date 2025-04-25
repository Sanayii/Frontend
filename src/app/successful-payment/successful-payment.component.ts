import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful-payment',
  imports: [CommonModule],
  templateUrl: './successful-payment.component.html',
  styleUrl: './successful-payment.component.css'
})
export class SuccessfulPaymentComponent {
  orderNumber: string = '345234323421134';

  constructor(private router: Router) {}

  continueShopping() {
    this.router.navigate(['/home']);
  }
}
