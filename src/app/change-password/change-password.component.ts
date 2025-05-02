import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator() });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }

  // Custom validator to check if passwords match
  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const newPassword = formGroup.get('newPassword');
      const confirmPassword = formGroup.get('confirmPassword');

      if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPassword?.setErrors(null);
        return null;
      }
    };
  }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }

    const model = {
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      confirmPassword: this.changePasswordForm.value.confirmPassword
    };

    this.accountService.changePassword(model).subscribe({
      next: (res) => {
        alert(res.message || "Password changed successfully!");
        this.changePasswordForm.reset();
        this.submitted = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        const errorMessage = err?.error?.message || "An error occurred while changing the password.";
        alert(errorMessage);
      }
    });
  }
}
