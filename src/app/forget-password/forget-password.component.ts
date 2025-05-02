import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;

    constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
      this.forgotPasswordForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.router.navigate(['/confirm-email']);
      this.accountService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(response => {
        console.log('Success:', response);
        this.router.navigate(['/confirm-email']);
      }, error => {
        console.error('Error:', error);
      });
    }
  }
}
