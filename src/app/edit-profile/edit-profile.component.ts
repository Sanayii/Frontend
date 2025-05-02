import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../_services/customer.service';
import { Customer } from '../_Models/Customer';
import { EditCustomerDTO } from '../_Models/edit-customer.dto';
import { TokenService } from '../_services/token.service';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  customerId: string | null = null;
  isLoading = true;
  error: string | null = null;

  get userPhones(): FormArray {
    return this.editForm.get('userPhones') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.editForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(18)]],
      city: ['', Validators.required],
      street: ['', Validators.required],
      government: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userPhones: this.fb.array([]) // use FormArray for dynamic phone inputs
    });
  }

  ngOnInit(): void {
    this.customerId = this.tokenService.getUserIdFromToken();

    if (!this.customerId) {
      this.error = 'User not authenticated.';
      this.isLoading = false;
      return;
    }

    this.loadCustomerData();
  }

  loadCustomerData(): void {
    this.customerService.getCustomerById(this.customerId!).subscribe({
      next: (customer: Customer) => {
        console.log('Customer loaded:', customer);
        this.populateForm(customer);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user data.';
        this.isLoading = false;
      }
    });
  }

  populateForm(customer: Customer): void {
    this.editForm.patchValue({
      fName: customer.fName,
      lName: customer.lName,
      age: customer.age,
      city: customer.city,
      street: customer.street,
      government: customer.government,
      email: customer.email
    });

    /*const phoneArray = this.editForm.get('userPhones') as FormArray;
    phoneArray.clear(); // remove any existing inputs

    (customer.phoneNumbers ?? []).forEach(phone => {
      phoneArray.push(new FormControl(phone, Validators.required));
    });*/
    (customer.phoneNumbers || []).forEach(phone => {
      this.userPhones.push(this.fb.control(phone));
    });
  }

  addPhoneInput(): void {
    this.userPhones.push(new FormControl('', Validators.required));
  }

  removePhoneInput(index: number): void {
    this.userPhones.removeAt(index);
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.markFormGroupTouched(this.editForm);
      return;
    }

    const formValue = this.editForm.value;

    const dto: EditCustomerDTO = {
      id: this.customerId!,
      fName: formValue.fName,
      lName: formValue.lName,
      age: formValue.age,
      city: formValue.city,
      street: formValue.street,
      government: formValue.government,
      email: formValue.email,
      phoneNumber: formValue.userPhones
    };

    this.isLoading = true;
    this.customerService.updateCustomer(this.customerId!, dto).subscribe({
      next: () => {
        this.router.navigate(['/user-profile']);
      },
      error: (err) => {
        this.error = 'Failed to update profile.';
        this.isLoading = false;
      }
    });
  }

  private markFormGroupTouched(control: AbstractControl): void {
    if (control instanceof FormControl) {
      control.markAsTouched();
    } else if (control instanceof FormGroup || control instanceof FormArray) {
      const groupControls = (control instanceof FormGroup)
        ? Object.values(control.controls)
        : (control as FormArray).controls;

      groupControls.forEach(ctrl => this.markFormGroupTouched(ctrl));
    }
  }

}
