import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';


@Component({
  selector: 'app-categories',
  imports: [CommonModule,FormsModule,RouterLink,ChatComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories = [
    {name:'Plumbing',image: '/assets/images/plumbing.jpeg'},
    {name:'Electricity',image: '/assets/images/electrical.jpeg'},
    {name:'Carpentry',image: '/assets/images/joiner.jpeg'},
    {name:'Painting and Decorating',image:'/assets/images/debate.jpeg'},
    {name:'Ceramic and tile installation',image:'/assets/images/maintenance.jpeg'},
    {name:'Blacksmithing and Aluminum',image:'/assets/images/blacksmith.jpeg'},
    {name:'House cleaning and maintenance',image:'/images/cleaning.jpeg'},
    {name:'Decorative unit design',image:'/assets/images/decor.jpeg'},
    {name:'Electrical appliance repair',image:'/assets/images/elec_repair.jpeg'},
    {name:'Air conditioning and refrigeration maintenance',image:'/assets/images/conditioning.jpeg'}
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
