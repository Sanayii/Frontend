import { Component } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceRequestDetailsDto } from '../_dtos/serive-request-details-dto';
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
  categoryId: number|null=null;
  constructor(private router: Router,public ar:ActivatedRoute,public dataService: DataServiceService,
    public paymentService: CreatePaymentService,private  test: TokenService) {
    this.customerId = this.test.getUserIdFromToken();
    this.SerDTO = this.dataService.getServiceRequestDetails();

  }

 price : number = 0;
  setRating(star: number) {
    this.selectedRating = star;
  }
  ngOnInit(): void {
    const categoryId = this.SerDTO?.categoryId ?? 0;

    if (categoryId === 1) {
      this.price = 100; // سباكة
    } else if (categoryId === 2) {
      this.price = 120; // كهرباء
    } else if (categoryId === 3) {
      this.price = 90; // نجارة
    } else if (categoryId === 4) {
      this.price = 80; // دهانات ونقاشة
    } else if (categoryId === 5) {
      this.price = 110; // تركيب سيراميك وبلاط
    } else if (categoryId === 6) {
      this.price = 130; // حدادة وألمنيوم
    } else if (categoryId === 7) {
      this.price = 70; // تنظيف وصيانة منازل
    } else if (categoryId === 8) {
      this.price = 150; // تصميم وحدات ديكور
    } else if (categoryId === 9) {
      this.price = 95; // إصلاح أجهزة كهربائية
    } else if (categoryId === 10) {
      this.price = 125; // صيانة المكيفات والتبريد
    } else {
      this.price = 50; // أي رقم غير موجود
    }

  }



  async pay() {
    const request = {
      PaymentId : this.SerDTO?.paymentId, // Payment ID (optional, based on your business logic)
      amount: this.price, // Amount in cents (e.g., $20.00)
      productName: this.SerDTO?.serviceName, // Product name
      successUrl: "http://localhost:4200/payment-success", // Redirection URL after success
      cancelUrl: `http://localhost:4200/payment-failed?paymentId=${this.SerDTO?.paymentId}&serviceId=${this.SerDTO?.serviceId}`
      , // Redirection URL after cancellation
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
          this.router.navigate([`../payment-failed?id=${this.SerDTO?.serviceId}`]);
        } else {
          this.router.navigate(['../payment-success']);
        }
      }
    });
  }


}
