import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent {
  isLoading = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';

  constructor(private accountService: AccountService, private router: Router) {}

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  resendEmail() {
    const email = prompt('Please enter your email address to resend the reset link:');

    if (!email) {
      return; // User cancelled the prompt
    }

    if (email.trim() === '') {
      this.showError = true;
      this.errorMessage = 'Email is required.';
      return;
    }

    if (!this.validateEmail(email)) {
      this.showError = true;
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;
    this.showError = false;
    this.showSuccess = false;

    this.accountService.forgotPassword(email).subscribe({
      next: (response) => {
        console.log('Reset email sent again:', response);
        this.isLoading = false;
        this.showSuccess = true;
      },
      error: (error) => {
        console.error('Error resending email:', error);
        this.isLoading = false;
        this.showError = true;
        this.errorMessage = error.error?.message ||
                          (error.status === 404 ? 'Email not found.' :
                          'Something went wrong. Please try again.');
      }
    });
  }
}
