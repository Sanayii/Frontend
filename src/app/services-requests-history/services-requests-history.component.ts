import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import * as bootstrap from 'bootstrap';

import { ServiceRequestWithDetails } from '../_Models/service-request.model';
import { RequestService } from '../_services/request.service';
import { TokenService } from '../_services/token.service';
import { Review } from '../_Models/review';
import { ReviewService } from '../_services/review.service';
import { ServiceStatus, ServiceStatusText } from '../_enums/service-status';
import { PaymentMethod } from '../_enums/payment-method';

@Component({
  selector: 'app-services-requests-history',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginator,
    MatSort,
    CommonModule,
    FormsModule
  ],
  templateUrl: './services-requests-history.component.html',
  styleUrl: './services-requests-history.component.css'
})
export class ServicesRequestsHistoryComponent implements OnInit {
  requests: ServiceRequestWithDetails[] = [];

  pageSize = 10;
  pageIndex = 0;
  totalRequests = 0;

  customerId: string | null = '';
  selectedRequest: any = null;
  Comment: string = '';
  selectedRating: number = 0;
  valid = false;

  constructor(
    private requestService: RequestService,
    private tokenService: TokenService,
    private reviewService: ReviewService
  ) {
    this.customerId = this.tokenService.getUserIdFromToken();
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getCustomerRequests(this.customerId!).subscribe({
      next: (data: any) => {
        this.requests = data;
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getStatusText(status: number): string {
    const key = ServiceStatus[status] as keyof typeof ServiceStatusText;
    return ServiceStatusText[key] ?? 'Unknown';
  }

  getStatusClass(status: number): string {
    switch (status) {
      case ServiceStatus.Service_Requested:
      case ServiceStatus.Awaiting_Approval:
        return 'bg-warning text-dark ';
      case ServiceStatus.Service_Completed:
      case ServiceStatus.Service_done_Successfully_and_payment_done_Successfully:
        return 'bg-success text-white ';
      case ServiceStatus.Service_Cancelled:
      case ServiceStatus.Service_Failed:
        return 'bg-danger text-white ';
      case ServiceStatus.In_Progress:
      case ServiceStatus.Artisan_On_The_Way:
      case ServiceStatus.Artisan_Nearing_Location:
      case ServiceStatus.Artisan_Arrived:
      case ServiceStatus.Service_Undergoing:
        return 'bg-info text-dark ';
      case ServiceStatus.Artisan_Busy:
        return 'bg-secondary text-white';
      case ServiceStatus.Service_done_Successfully_you_Should_complete_payment_method:
        return 'bg-primary text-white ';
      default:
        return 'bg-light text-muted ';
    }
  }

  getStatusIcon(status: number): string {
    switch (status) {
      case ServiceStatus.Service_Requested:
      case ServiceStatus.Awaiting_Approval:
        return 'hourglass_empty';
      case ServiceStatus.Service_Completed:
      case ServiceStatus.Service_done_Successfully_and_payment_done_Successfully:
        return 'check_circle';
      case ServiceStatus.Service_Cancelled:
      case ServiceStatus.Service_Failed:
        return 'cancel';
      case ServiceStatus.In_Progress:
      case ServiceStatus.Artisan_On_The_Way:
      case ServiceStatus.Artisan_Nearing_Location:
      case ServiceStatus.Artisan_Arrived:
      case ServiceStatus.Service_Undergoing:
        return 'directions_run';
      case ServiceStatus.Artisan_Busy:
        return 'schedule';
      case ServiceStatus.Service_done_Successfully_you_Should_complete_payment_method:
        return 'payment';
      default:
        return 'help_outline';
    }
  }

  getMethodText(method: number | undefined): string {
    if (method === undefined || method === null) return 'Not specified';
    return PaymentMethod[method] ?? 'Unknown';
  }

  getMethodIcon(method: number | undefined): string {
    if (method === undefined) return 'help_outline';

    switch (method) {
      case PaymentMethod.Cash:
        return 'attach_money';
      case PaymentMethod.CreditCard:
        return 'credit_card';
      case PaymentMethod.PayPal:
        return 'payment';
      case PaymentMethod.BankTransfer:
        return 'account_balance';
      default:
        return 'help_outline';
    }
  }

  getPaymentMethodClass(method: number | undefined): string {
    if (method === undefined) return 'text-muted';

    switch (method) {
      case PaymentMethod.Cash:
        return 'bg-success text-white';
      case PaymentMethod.CreditCard:
        return 'bg-primary text-white';
      case PaymentMethod.PayPal:
        return 'bg-info text-dark';
      case PaymentMethod.BankTransfer:
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary text-white';
    }
  }

  openRatingDialog(request: any) {
    this.selectedRequest = request;
    this.Comment = '';
    this.selectedRating = 0;

    const modal = new bootstrap.Modal(document.getElementById('ratingModal')!);
    modal.show();
  }

  setRating(star: number) {
    this.selectedRating = star;
  }

  isRatingValid(): boolean | string {
    return this.Comment && this.Comment.trim().length > 0 && this.selectedRating > 0;
  }

  submitRating() {
    this.valid = true;
    if (!this.isRatingValid()) {
      return;
    }

    const review: Review = {
      reviewDate: new Date(),
      rating: this.selectedRating,
      customerId: this.customerId,
      artisanId: this.selectedRequest.artisanId,
      serviceId: this.selectedRequest.serviceId,
      comment: this.Comment
    };

    this.reviewService.addRating(review).subscribe({
      next: (response: any) => {
        alert("You rated this service successfully.");
      }
    });

    const modal = bootstrap.Modal.getInstance(document.getElementById('ratingModal')!);
    modal?.hide();
  }
}
