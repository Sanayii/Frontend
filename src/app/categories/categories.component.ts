import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-categories',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories = [
    {name: 'سباكة',image: 'images/plumbing.jpeg'},
    {name: 'كهرباء',image: 'images/electrical.jpeg'},
    {name: 'نجارة',image: 'images/joiner.jpeg'},
    {name:'دهانات ونقاشة',image:'images/debate.jpeg'},
    {name:'تركيب سيراميك وبلاط',image:'images/maintenance.jpeg'},
    {name:'حدادة وألمنيوم',image:'images/blacksmith.jpeg'},
    {name:'تنظيف وصيانة منازل',image:'images/cleaning.jpeg'},
    {name:'تصميم وحدات ديكور',image:'images/decor.jpeg'},
    {name:'إصلاح أجهزة كهربائية',image:'images/elec_repair.jpeg'},
    {name:'صيانة المكيفات والتبريد',image:'images/conditioning.jpeg'}
  ];

  selectedCategory: string = "";

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
}
