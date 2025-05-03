import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceRequestDetailsDto } from '../_dtos/serive-request-details-dto';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';
import { OnInit } from '@angular/core';
import { PaymentMethod } from '../_enums/payment-method';
import { TokenService } from '../_services/token.service';
import { PaymentService } from '../_services/payment.service';
@Component({
  selector: 'app-service-payment',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './service-payment.component.html',
  styleUrls: ['./service-payment.component.css']
})
export class ServicePaymentComponent implements OnInit {
  customerId: string | null = null;
  paymentid: number | null = null;
  serviceId: number | null = null;

  SerDTO: ServiceRequestDetailsDto | null = null;
  paymentMethodEnum = PaymentMethod;

  constructor(
    private router: Router,
    public ar: ActivatedRoute,
    public dataService: DataServiceService,
    public test: TokenService,
    private paymentService: PaymentService // Inject PaymentService
  ) { }

  ngOnInit(): void {
    this.SerDTO = this.dataService.getServiceRequestDetails();
    this.customerId = this.test.getUserIdFromToken();
    if (this.SerDTO) {
      this.paymentid = this.SerDTO.paymentId ?? null;
      this.serviceId = this.SerDTO.serviceId ?? null;
    }
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
    console.log(this.paymentid);
    console.log(this.serviceId);
    console.log(this.customerId);
    // If there is a payment ID and service ID, call the delete method
    if (this.paymentid && this.serviceId && this.customerId) {
      this.paymentService.deletePayment(this.customerId, Number(this.paymentid), Number(this.serviceId)).subscribe(
        () => {
          console.log('Payment deleted successfully');
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error deleting payment:', error);
        }
      );
    } else {
      console.error('Missing payment or service details for cancellation');
    }
  }
}
