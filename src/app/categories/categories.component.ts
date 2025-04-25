import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from '../chat/chat.component';

import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-categories',
  imports: [CommonModule,FormsModule,RouterLink,ChatComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  formData = {
    firstName: '',
    lastName: '',
    contact: '',
    address: '',
    details: '',
    data:'',
    paymentMethod:''
  };

  constructor(private router: Router) {}

  categories = [
    {name: 'Plumbing',image: '/assets/images/plumbing.jpeg',artisan:'Ahmed Mohamed'},
    {name: 'Electricity',image: '/assets/images/electrical.jpeg',artisan:'Mohamed Hassan'},
    {name: 'Carpentry',image: '/assets/images/joiner.jpeg',artisan:'Ali Mohamed'},
    {name: 'Painting and Decorating',image:'/assets/images/debate.jpeg',artisan:'Ali Hassan'},
    {name: 'Ceramic and tile installation',image:'/assets/images/maintenance.jpeg',artisan:'Mohsen Saber'},
    {name: 'Blacksmithing and Aluminum',image:'/assets/images/blacksmith.jpeg',artisan:'Ali Saber'},
    {name: 'House cleaning and maintenance',image:'/assets/images/cleaning.jpeg',artisan:'Samir sayed'},
    {name: 'Electrical appliance repair',image:'/assets/images/elec_repair.jpeg',artisan:'Alaa shaker'},
    {name: 'Air conditioning and refrigeration maintenance',image:'/assets/images/conditioning.jpeg',artisan:'Khaled mohamed'},
  ];

  selectedCategory: string = "";
  selectedArtisan: string = "";
  showAll = false;

  get visibleCategories() {
    return this.showAll ? this.categories : this.categories.slice(0, 6);
  }

  handleCategoryClick(serviceName: string, artisanName: string) {
    this.selectedCategory = serviceName;
    this.selectedArtisan = artisanName;
    const modal = document.getElementById('serviceModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }
  submitRequestForm() {
    console.log('Submit button clicked!');
    const modal = document.getElementById('serviceModal');
  if (modal) {
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal?.hide();
  }
    this.router.navigate(['/service-payment'], {
      state: {
        ...this.formData,
        selectedCategory: this.selectedCategory,
        artisanName: this.selectedArtisan
      }
    });
  }


  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}
