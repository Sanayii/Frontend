import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed-payment',
  imports: [CommonModule],
  templateUrl: './failed-payment.component.html',
  styleUrl: './failed-payment.component.css'
})
export class FailedPaymentComponent {
  orderAmount: number = 888;

  constructor(private router: Router) {}

  tryAgain() {
    this.router.navigate(['/service-payment']);
  }
}
