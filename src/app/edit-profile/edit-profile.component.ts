import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../_services/customer.service';
import { EditCustomerDTO } from '../_Models/edit-customer.dto';
import { Customer } from '../_Models/customer';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  editForm: FormGroup;
  customerId: string = '';
  isLoading = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      city: ['', Validators.required],
      street: ['', Validators.required],
      government: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      userPhones: ['']
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.error = 'No customer ID provided in URL';
        this.isLoading = false;
        return;
      }
      this.customerId = id;
      this.loadCustomerData();
    });
  }
  loadCustomerData(): void {
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        this.populateForm(customer);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
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
      email: customer.email,
      phoneNumber: customer.phoneNumbers || '',
      userPhones: customer.phoneNumbers.join(', ') || ''
    });
  }
  onSubmit(): void {
    if (this.editForm.invalid) {
      this.markFormGroupTouched(this.editForm);
      return;
    }
    const formValue = this.editForm.value;
    const dto: EditCustomerDTO = {
      id: this.customerId,
      fName: formValue.fName,
      lName: formValue.lName,
      age: formValue.age,
      city: formValue.city,
      street: formValue.street,
      government: formValue.government,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      userPhones: formValue.userPhones ? formValue.userPhones.split(',').map((phone: string) => phone.trim()) : []
    };
    this.isLoading = true;
    this.customerService.updateCustomer(this.customerId, dto).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        this.router.navigate(['/user-profile']);
      },
      error: (err) => {
        console.error('Update failed:', {
          error: err,
          status: err.status,
          message: err.message,
          url: err.url
        });
        this.error = err.message;
        this.isLoading = false;
      }
    });
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
