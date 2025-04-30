import { Component } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceRequestDetailsDto } from '../_dtos/serive-reques-details-dto';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';
import { OnInit } from '@angular/core';
import { CreatePaymentService } from '../_services/create-payment.service';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../_services/token.service';
@Component({
  selector: 'app-checkout-request',
  imports: [MatSort,RouterLink,MatIcon,MatIconModule,MatButtonModule,CommonModule],
  standalone: true,
  templateUrl: './checkout-request.component.html',
  styleUrl: './checkout-request.component.css'
})
export class CheckoutRequestComponent  implements OnInit {
  selectedRating = 0;
  SerDTO :ServiceRequestDetailsDto |null = null;
  customerId: string|null;
  constructor(private router: Router,public ar:ActivatedRoute,public dataService: DataServiceService,
    public paymentService: CreatePaymentService,private  test: TokenService) {
    this.customerId = this.test.getUserIdFromToken();
    this.SerDTO = this.dataService.getServiceRequestDetails();
  }

 price : number = 3000;
  setRating(star: number) {
    this.selectedRating = star;
  }
  ngOnInit(): void {

    if (this.SerDTO?.serviceId) {
      this.paymentService.getprice(this.SerDTO.serviceId).subscribe(
        response => {
          this.price = response;
        },
        error => {
          console.error('Error fetching price:', error);
        }
      );
    } else {
      console.error('Service ID is invalid or not defined.');
    }

    }


  taxRate: number = 0.14; // 14% tax rate
  convenienceFee: number = 50; // Flat convenience fee

  // Calculate the total
  getTotal(): number {
    const tax = this.price * this.taxRate;
    const total = this.price + tax + this.convenienceFee;
    return total;
  }

  getTax(): number {
    const tax = this.price * this.taxRate;
    return parseFloat(tax.toFixed(2));
  }
  async pay() {
    const request = {
      PaymentId : this.SerDTO?.paymentId, // Payment ID (optional, based on your business logic)
      amount: this.getTotal(), // Amount in cents (e.g., $20.00)
      productName: this.SerDTO?.serviceName, // Product name
      successUrl: "http://localhost:4200/payment-success", // Redirection URL after success
      cancelUrl: "http://localhost:4200/payment-failed", // Redirection URL after cancellation
      customerId: this.customerId, // Customer ID
      serviceId: this.SerDTO?.serviceId, // Your service ID (optional, based on your business logic)
    };
    this.paymentService.createCheckoutSession(request).subscribe(async res => {
      if (res.sessionId && res.publishableKey) {
        const stripe = await loadStripe(res.publishableKey);
        if (!stripe) {
          console.error('فشل تحميل Stripe');
          return;
        }
        const result = await stripe.redirectToCheckout({ sessionId: res.sessionId });
        if (result.error) {
          console.error('حدث خطأ أثناء التوجيه إلى صفحة الدفع:', result.error.message);
          this.router.navigate(['../payment-failed']);
        } else {
          this.router.navigate(['../payment-success']);
        }
      }
    });
  }


}