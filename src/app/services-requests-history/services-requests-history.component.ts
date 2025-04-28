import { Component, OnInit, PipeTransform } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router'
import { NgModel } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//UI Matrial import
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ServiceRequestWithDetails } from '../_models/service-request.model';
import { RequestService } from '../_services/request.service';
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

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.isLoading = true;
    this.error = null;
    this.showEmptyState = false;
    
    // In a real app, you would get the customer ID from auth service or route params
    const customerId = '701b6ee7-b7f2-46e4-ad64-a4c8ea2098cd'; // Replace with actual customer ID
    
    this.requestService.getCustomerRequests(customerId).subscribe({
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

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getStatusText(status: number): string {
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

  getStatusClass(status: number): string {
    switch(status) {
      case 1: return 'bg-warning';
      case 2: return 'bg-success';
      case 3: return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getStatusIcon(status: number): string {
    switch(status) {
      case 1: return 'pending';
      case 2: return 'check_circle';
      case 3: return 'cancel';
      default: return 'help';
    }
  }


}
