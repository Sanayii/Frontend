import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-categories',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  formData = {
    firstName: '',
    lastName: '',
    contact: '',
    address: '',
    details: ''
  };

  constructor(private router: Router) {}

  categories = [
    {name: 'سباكة',image: 'assets/images/plumbing.jpeg',artisan:'احمد علي'},
    {name: 'كهرباء',image: 'assets/images/electrical.jpeg',artisan:'محمد حسن'},
    {name: 'نجارة',image: 'assets/images/joiner.jpeg',artisan:'علي محمد'},
    {name:'دهانات ونقاشة',image:'assets/images/debate.jpeg',artisan:'علي حسن'},
    {name:'تركيب سيراميك وبلاط',image:'assets/images/maintenance.jpeg',artisan:'محسن صابر'},
    {name:'حدادة وألمنيوم',image:'assets/images/blacksmith.jpeg',artisan:'علي صابر'},
    {name:'تنظيف وصيانة منازل',image:'assets/images/cleaning.jpeg',artisan:'سمير سيد'},
    {name:'تصميم وحدات ديكور',image:'assets/images/decor.jpeg',artisan:'طارق كامل'},
    {name:'إصلاح أجهزة كهربائية',image:'assets/images/elec_repair.jpeg',artisan:'علاء شكري'},
    {name:'صيانة المكيفات والتبريد',image:'assets/images/conditioning.jpeg',artisan:'خالد محمد'},
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
