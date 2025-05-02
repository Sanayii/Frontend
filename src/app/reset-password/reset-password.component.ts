import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  email: string = '';
  token: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {
    // Form with validation
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatch });
  }

  ngOnInit(): void {
    // Extract email and token from the query params
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  // Custom validator to check that password and confirm password match
  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const resetPasswordData = {
        email: this.email,
        password: this.resetPasswordForm.value.password,
        confirmPassword: this.resetPasswordForm.value.confirmPassword,
        token: this.token,
      };

      this.accountService.resetPassword(resetPasswordData).subscribe({
        next: (response: any) => {
          this.successMessage = response.message;
          this.errorMessage = '';
          alert(this.successMessage);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.error?.errors?.join(', ') || 'Something went wrong';
          this.successMessage = '';
        }
      });
    }
  }
}
