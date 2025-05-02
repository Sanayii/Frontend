import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AccountService } from '../../_services/account.service';
import { Customer } from '../../_Models/Customer';


@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  constructor( private registerService: AccountService, private router: Router) {}

  registerForm : FormGroup = new FormGroup({
    userName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    fName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    lName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    street: new FormControl('',[Validators.required, Validators.minLength(3)]),
    city: new FormControl('',[Validators.required, Validators.minLength(3)]),
    government: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',[Validators.required]),

    phoneNumbers: new FormArray([])
  });

  get userName() { return this.registerForm.get('userName'); }
  get fName()    { return this.registerForm.get('fName'); }
  get lName()    { return this.registerForm.get('lName'); }

  get street() { return this.registerForm.get('street'); }
  get city()    { return this.registerForm.get('city'); }
  get government()    { return this.registerForm.get('government'); }

  get email()    { return this.registerForm.get('email'); }
  get password()    { return this.registerForm.get('password'); }
  get confirmPassword()    { return this.registerForm.get('confirmPassword'); }

  get phoneNumbers() {
    return this.registerForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber()
  {
    this.phoneNumbers.push(new FormControl(''));
  }

  submit() {
    if (this.registerForm.invalid) {
      return;
    }

    const customer: Customer = this.registerForm.value as Customer;

    console.log(customer);

    this.registerService.register(customer).subscribe({
      next: (response: any) => {
        console.log('Registered successfully', response);
        alert("Please check your email to verify your account.");
        this.router.navigate(['/confirm-email-register']);

      },
      error: (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
  });
  }
}
