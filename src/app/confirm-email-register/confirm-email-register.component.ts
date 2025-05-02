import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-email-register',
  imports: [CommonModule],
  templateUrl: './confirm-email-register.component.html',
  styleUrls: ['./confirm-email-register.component.css']
})
export class ConfirmEmailRegisterComponent {
  confirmationStatus: string = '';
  isEmailSent: boolean = false;  // هذه لتحديد ما إذا تم إرسال البريد الإلكتروني

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (userId && token) {
      // تأكيد البريد الإلكتروني عند الوصول إلى الرابط
      this.accountService.confirmEmail(userId, token).subscribe({
        next: (response) => {
          this.confirmationStatus = response.message;
          if (response.redirectToLogin) {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.confirmationStatus = 'فشل في تأكيد البريد الإلكتروني.';
        }
      });
    }
  }

  invalidEmailMessage: string | null = null;

  resendEmail(): void {
    const email = prompt('Please enter your email to resend the confirmation link:');

    if (email) {
      if (!this.isValidEmail(email)) {
        this.invalidEmailMessage = 'The email address you entered is invalid. Please try again.';
        return;
      }

      this.invalidEmailMessage = null; // clear error if email is valid
      this.accountService.resendConfirmationEmail(email).subscribe({
        next: (response) => {
          console.log('Resend email response:', response); // For debugging
          this.isEmailSent = true;
          this.confirmationStatus = response.message;
        },
        error: (error) => {
          console.error('Error resending email:', error); // For debugging
          this.isEmailSent = false;
          this.confirmationStatus = 'حدث خطأ أثناء إرسال البريد الإلكتروني. حاول مرة أخرى لاحقاً.';
        }
      });
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
