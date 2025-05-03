import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TokenService } from '../_services/token.service';
import { PaymentService } from '../_services/payment.service';  

@Component({
  selector: 'app-failed-payment',
  templateUrl: './failed-payment.component.html',
  styleUrls: ['./failed-payment.component.css']
})
export class FailedPaymentComponent implements OnInit {
  paymentId: string | null = null;
  serviceId: string | null = null;
  customerId: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private test: TokenService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.paymentId = params['paymentId'];
      this.serviceId = params['serviceId'];
      console.log("Payment ID:", this.paymentId);
      console.log("Service ID:", this.serviceId);
    });
    this.customerId = this.test.getUserIdFromToken();
  }

  // Method to delete the payment
  deletePayment(): void {
    if (this.paymentId && this.serviceId && this.customerId) {
      this.paymentService.deletePayment(this.customerId, Number(this.paymentId), Number(this.serviceId)).subscribe(
        () => {
          console.log('Payment deleted successfully');

        },
        error => {
          console.error('Error deleting payment:', error);

        }
      );
    } else {
      console.error('Missing required parameters for payment deletion');
    }
  }

  tryAgain(): void {

    this.deletePayment();
    this.router.navigate(['../home']);
  }
}
