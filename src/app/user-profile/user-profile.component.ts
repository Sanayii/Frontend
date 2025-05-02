import { Component } from '@angular/core';
import { CustomerService } from '../_services/customer.service';

import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Customer } from '../_Models/Customer';
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
  customerId: string | any;

  constructor(private customerService: CustomerService, private router: Router,private  test: TokenService) {
    this.customerId = this.test.getUserIdFromToken();
   }
  ngOnInit(): void {
    this.loadCustomerData();
  }
  loadCustomerData(): void {
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        console.log('Customer loaded:', customer);
        this.customer = customer;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load customer data';
        this.isLoading = false;
      }
    });
  }
  get userName(): string {
    return this.customer?.userName || ''; // Note the 'userNamr' spelling
  }
  getInitials(): string {
    if (!this.customer) return '';
    return `${this.customer.fName.charAt(0)}${this.customer.lName.charAt(0)}`;
  }

  getPhoneNumbers(): string[] {
    return this.customer?.phoneNumber || [];
  }

}
