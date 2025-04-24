import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-categories',
  imports: [CommonModule,FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categories = [
    {name: 'سباكة',image: 'assets/images/plumbing.jpeg'},
    {name: 'كهرباء',image: 'assets/images/electrical.jpeg'},
    {name: 'نجارة',image: 'assets/images/joiner.jpeg'},
    {name:'دهانات ونقاشة',image:'assets/images/debate.jpeg'},
    {name:'تركيب سيراميك وبلاط',image:'assets/images/maintenance.jpeg'},
    {name:'حدادة وألمنيوم',image:'assets/images/blacksmith.jpeg'},
    {name:'تنظيف وصيانة منازل',image:'assets/images/cleaning.jpeg'},
    {name:'تصميم وحدات ديكور',image:'assets/images/decor.jpeg'},
    {name:'إصلاح أجهزة كهربائية',image:'assets/images/elec_repair.jpeg'},
    {name:'صيانة المكيفات والتبريد',image:'assets/images/conditioning.jpeg'}
  ];

  selectedCategory: string = "";
  showAll = false;

  get visibleCategories() {
    return this.showAll ? this.categories : this.categories.slice(0, 6);
  }

  handleCategoryClick(serviceName: string) {
    this.selectedCategory = serviceName;
    const modal = document.getElementById('serviceModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }
  submitRequestForm() {
    alert(`Request submitted for: ${this.selectedCategory}`);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}
