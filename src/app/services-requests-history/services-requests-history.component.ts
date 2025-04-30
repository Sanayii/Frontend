import { Component, OnInit, PipeTransform } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router'
import { NgModel } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentMethod } from '../_enums/payment-method';
import { ServiceRequest } from '../_Models/service-request.model';

//UI Matrial import
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ServiceRequestWithDetails } from '../_Models/service-request.model';
import { RequestService } from '../_services/request.service';
import { TokenService } from '../_services/token.service';
import { ServiceStatus } from '../_enums/service-status';


@Component({
  selector: 'app-services-requests-history',
  imports: [RouterLink,RouterOutlet,MatButtonModule,MatIconModule,
    MatProgressSpinnerModule,MatCardModule,MatPaginator,MatSort,CommonModule],
  templateUrl: './services-requests-history.component.html',
  styleUrl: './services-requests-history.component.css'
})
export class ServicesRequestsHistoryComponent {
  requests: ServiceRequestWithDetails[] = [];
  filteredRequests: ServiceRequestWithDetails[] = [];
  isLoading = true;
  error: string | null = null;
  showEmptyState = false;

  // Pagination
  pageSize = 10;
  pageIndex = 0;
  totalRequests = 0;

  // Filters
  statusFilter = '';
  serviceTypeFilter = '';
  customerId: string|null = '';
  constructor(private requestService: RequestService,private  test: TokenService) {
    this.customerId = this.test.getUserIdFromToken();
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.isLoading = true;
    this.error = null;
    this.showEmptyState = false;

    // In a real app, you would get the customer ID from auth service or route params
+
    this.requestService.getCustomerRequests(this.customerId!).subscribe({
      next: (data:any) => {
        console.log('Data received:', data);

        this.requests = data;
        this.filteredRequests = [...data];
        this.totalRequests = data.length;
        this.isLoading = false;
        this.showEmptyState = data.length === 0;
      },
      error: (err:any) => {
        console.error('Full error:', err);
        this.error = 'Failed to load service requests. Please try again later.';
        this.isLoading = false;
        console.error('Error loading requests:', err);
      }
    });
  }



  applyFilters(): void {
    this.filteredRequests = this.requests.filter(request => {
      const statusMatch = !this.statusFilter ||
        this.getStatusText(request.status) === this.statusFilter;
      const serviceMatch = !this.serviceTypeFilter ||
        (request.serviceName && request.serviceName.includes(this.serviceTypeFilter));
      return statusMatch && serviceMatch;
    });
    this.totalRequests = this.filteredRequests.length;
    this.pageIndex = 0;
    this.showEmptyState = this.filteredRequests.length === 0;
  }



onPageChange(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
}



getStatusText(status: number): string {
  return ServiceStatus[status] ?? 'Unknown';
}
  getStatusClass(status: number): string {
    switch (status) {
      case ServiceStatus.Pending: return 'bg-warning text-dark';
      case ServiceStatus.Completed: return 'bg-success text-white';
      case ServiceStatus.Rejected: return 'bg-danger text-white';
      case ServiceStatus.InProgress: return 'bg-info text-dark';
      case ServiceStatus.Failed: return 'bg-secondary text-white';
      default: return 'bg-light text-muted';
    }
  }
  getStatusIcon(status: number): string {
    switch (status) {
      case ServiceStatus.Pending: return 'hourglass_empty';
      case ServiceStatus.Completed: return 'check_circle';
      case ServiceStatus.Rejected: return 'cancel';
      case ServiceStatus.InProgress: return 'autorenew';
      case ServiceStatus.Failed: return 'error_outline';
      default: return 'help';
    }
  }

  getMethodTextt(method: number): string {
    return PaymentMethod[method] ?? 'Unknown';
  }
  getMethodText(method: number | undefined): string {
    if (method === undefined || method === null) return 'Not specified';
    return PaymentMethod[method] ?? 'Unknown';
  }

  getMethodIcon(method: number | undefined): string {
    if (method === undefined) return 'help_outline';

    switch (method) {
      case PaymentMethod.Cash: return 'attach_money';
      case PaymentMethod.CreditCard: return 'credit_card';
      case PaymentMethod.PayPal: return 'payment';
      case PaymentMethod.BankTransfer: return 'account_balance';
      default: return 'help_outline';
    }
  }

  getPaymentMethodClass(method: number | undefined): string {
    if (method === undefined) return 'text-muted';

    switch (method) {
      case PaymentMethod.Cash: return 'bg-success text-white';
      case PaymentMethod.CreditCard: return 'bg-primary text-white';
      case PaymentMethod.PayPal: return 'bg-info text-dark';
      case PaymentMethod.BankTransfer: return 'bg-warning text-dark';
      default: return 'bg-secondary text-white';
    }
  }
}
