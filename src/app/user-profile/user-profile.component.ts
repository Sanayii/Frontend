import { Component } from '@angular/core';
import { CustomerService } from '../_services/customer.service';

import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Customer } from '../_Models/customer';
import { TokenService } from '../_services/token.service';

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
  constructor(private customerService: CustomerService, private router: Router,private  test: TokenService) {
    this.customerId = this.test.getUserIdFromToken();
   }
  ngOnInit(): void {
    this.loadCustomerData();
  }
  loadCustomerData(): void {
    this.customerService.getCustomerById(this.customerId).subscribe({
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
    console.log(this.customer.phoneNumbers);
    return (this.customer.phoneNumbers.length > 0 ? this.customer.phoneNumbers[0] : 'N/A');
  }

  navigateToEdit(): void {
    this.router.navigate(['/edit-profile', '701b6ee7-b7f2-46e4-ad64-a4c8ea2098cd']);
  }
}
