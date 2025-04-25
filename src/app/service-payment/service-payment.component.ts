import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-payment',
  imports: [CommonModule,FormsModule],
  templateUrl: './service-payment.component.html',
  styleUrl: './service-payment.component.css'
})
export class ServicePaymentComponent {
  data: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.data = nav?.extras?.state || {};
  }
  cancelRequest() {
    this.router.navigate(['/home']);
  }
}
