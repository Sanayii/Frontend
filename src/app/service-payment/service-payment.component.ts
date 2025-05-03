import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceRequestDetailsDto } from '../_dtos/serive-request-details-dto';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';
import { OnInit } from '@angular/core';
import { PaymentMethod } from '../_enums/payment-method';

@Component({
  selector: 'app-service-payment',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './service-payment.component.html',
  styleUrl: './service-payment.component.css'
})
export class ServicePaymentComponent implements OnInit {
  SerDTO :ServiceRequestDetailsDto |null = null;
  paymentMethodEnum = PaymentMethod;
  constructor(private router: Router,public ar:ActivatedRoute,public dataService: DataServiceService) {
  }
  ngOnInit(): void {
    this.SerDTO = this.dataService.getServiceRequestDetails();

    }


    handleConfirmRequest() {
      if (this.SerDTO?.paymentMethod === PaymentMethod.Cash) {
        // For cash payment, show alert and navigate to home
        alert('Your request has been confirmed! The artisan will contact you soon.');
        this.router.navigate(['/home']);
      } else {
        // For other payment methods, navigate to checkout
        this.router.navigate(['/checkout-request']);
      }
    }
    
  cancelRequest() {
    this.router.navigate(['/home']);
  }
}
