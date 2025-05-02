import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePass } from '../_dtos/change-pass';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {


    changePasswordForm: FormGroup;

    constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
      // Simple form with no validation
      this.changePasswordForm = this.fb.group({
        currentPassword: [''],
        newPassword: [''],
        confirmPassword: ['']
      });
    }

    onSubmit() {
      const model = {
        currentPassword: this.changePasswordForm.value.currentPassword,
        newPassword: this.changePasswordForm.value.newPassword,
        confirmPassword: this.changePasswordForm.value.confirmPassword
      };

      this.accountService.changePassword(model).subscribe({
        next: (res) => {
          alert(res.message || "Password changed successfully!");
          this.changePasswordForm.reset();
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
