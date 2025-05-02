import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  imports: [],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent {


    constructor(private accountService: AccountService, private router: Router) {}

    resendEmail() {
      const email = prompt('Please enter your email address to resend the reset link:');

      if (email && email.trim() !== '') {
        this.accountService.forgotPassword(email).subscribe({
          next: (response) => {
            console.log('Reset email sent again:', response);
            alert('Reset email has been sent!');
          },
          error: (error) => {
            console.error('Error resending email:', error);
            alert('Something went wrong. Please try again.');
          }
        });
      } else {
        alert('Email is required.');
      }
    }
  }

