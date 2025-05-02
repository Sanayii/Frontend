import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;
  submitted = false;
  isLoading = false;
  alerts: { type: string, message: string }[] = [];
  faEnvelope = faEnvelope;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  showAlert(message: string, type: 'success'|'danger'|'warning'|'info') {
    this.alerts.push({ type, message });
    setTimeout(() => this.alerts.shift(), 5000);
  }

  closeAlert(index: number) {
    this.alerts.splice(index, 1);
  }

  onSubmit() {
    this.submitted = true;
    this.alerts = [];

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;

    this.accountService.forgotPassword(email).subscribe({
      next: (response) => {
        this.showAlert('Password reset link sent to your email!', 'success');
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/confirm-email'], { state: { email } });
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error:', error);

        let errorMessage = "An error occurred while processing your request.";
        if (error.status === 404) {
          errorMessage = "Email not found. Please check your email address.";
        } else if (error.status === 0) {
          errorMessage = "Network error. Please check your internet connection.";
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        this.showAlert(errorMessage, 'danger');
      }
    });
  }
}
