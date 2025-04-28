import { Component,OnInit, PipeTransform } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router'
import { NgModel } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Payment, PaymentService } from '../_services/payment.service';
@Component({
  selector: 'app-payment-history',
  imports: [RouterLink,RouterOutlet,MatButtonModule,MatIconModule,
      MatProgressSpinnerModule,MatCardModule,MatPaginator,MatSort,CommonModule],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.css'
})
export class PaymentHistoryComponent {
  payments: Payment[] = [];
  isLoading = true;
  error: string | null = null;

  // Pagination variables
  pageSize = 10;
  pageIndex = 0;
  totalPayments = 0;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.isLoading = true;
    this.error = null;

    // In a real app, you would get the customer ID from auth service or route params
    const customerId = '701b6ee7-b7f2-46e4-ad64-a4c8ea2098cd'; // Replace with actual customer ID

    this.paymentService.getCustomerPayments(customerId).subscribe({
      next: (data) => {
        this.payments = data;
        this.totalPayments = data.length;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load payment history. Please try again later.';
        this.isLoading = false;
        console.error('Error loading payments:', err);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // If you're implementing server-side pagination, you would call loadPayments() here
    // with the new pagination parameters
  }

  getPaymentStatusText(status: number): string {
    // Convert numeric status to text based on your PaymentStatus enum
    switch(status) {
      case 1: return 'Pending';
      case 2: return 'Completed';
      case 3: return 'Failed';
      case 4: return 'Canceled';
      case 5: return 'Refunded';
      case 6: return 'OnHold';
      default: return 'Unknown';
    }
  }
  getPaymentMethodText(method: number): string {
    // Convert numeric method to text based on your PaymentMethods enum
    switch(method) {
      case 0: return 'Cash';
      case 1: return 'CreditCard';
      case 2: return 'PayPal';
      case 3: return 'BankTransfer';
      default: return 'Other';
    }
  }
}
