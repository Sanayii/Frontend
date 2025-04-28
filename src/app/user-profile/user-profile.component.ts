import { Component } from '@angular/core';
import { Customer } from '../_models/Customer';
import { CustomerService } from '../_services/customer.service';

import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink,RouterLink,CommonModule],

  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  customer: Customer | null = null;
  isLoading = true;
  error: string | null = null;
  customerId: any;
  constructor(private customerService: CustomerService, private router: Router) { }
  ngOnInit(): void {
    this.loadCustomerData();
  }
  loadCustomerData(): void {
    const customerId = '701b6ee7-b7f2-46e4-ad64-a4c8ea2098cd'; // Get from route params or auth service
    
    this.customerService.getCustomerById(customerId).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load customer data';
        this.isLoading = false;
      }
    });
  }
  getInitials(): string {
    if (!this.customer) return '';
    return `${this.customer.fName.charAt(0)}${this.customer.lName.charAt(0)}`;
  }

  getPrimaryPhone(): string {
    if (!this.customer) return 'N/A';
    return this.customer.phoneNumber || 
          (this.customer.userPhones.length > 0 ? this.customer.userPhones[0] : 'N/A');
  }

  navigateToEdit(): void {
    this.router.navigate(['/edit-profile', '701b6ee7-b7f2-46e4-ad64-a4c8ea2098cd']);
  }
}
