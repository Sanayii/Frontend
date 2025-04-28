import { CommonModule, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat/chat.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-categories',
  imports: [CommonModule,FormsModule,RouterLink,ChatComponent,HttpClientModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent  implements AfterViewInit {

  categories: Category[] = [];
  @ViewChild(ChatComponent) chatComponent!: ChatComponent;



  // Form data model
  formData = {
    firstName: '',
    lastName: '',
    contact: '',
    address: '',
    details: '',
    data: '',
    paymentMethod: ''
  };

  constructor(private router: Router,
      private scroller: ViewportScroller,
      private route: ActivatedRoute,
      private categoryService: CategoryService) {}

  /*categories = [
    {name: 'Plumbing',image: '/assets/images/plumbing.jpeg',artisan:'Ahmed Mohamed'},
    {name: 'Electricity',image: '/assets/images/electrical.jpeg',artisan:'Mohamed Hassan'},
    {name: 'Carpentry',image: '/assets/images/joiner.jpeg',artisan:'Ali Mohamed'},
    {name: 'Painting and Decorating',image:'/assets/images/debate.jpeg',artisan:'Ali Hassan'},
    {name: 'Ceramic and tile installation',image:'/assets/images/maintenance.jpeg',artisan:'Mohsen Saber'},
    {name: 'Blacksmithing and Aluminum',image:'/assets/images/blacksmith.jpeg',artisan:'Ali Saber'},
    {name: 'House cleaning and maintenance',image:'/assets/images/cleaning.jpeg',artisan:'Samir sayed'},
    {name: 'Electrical appliance repair',image:'/assets/images/elec_repair.jpeg',artisan:'Alaa shaker'},
    {name: 'Air conditioning and refrigeration maintenance',image:'/assets/images/conditioning.jpeg',artisan:'Khaled mohamed'},
  ];*/
  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories = data.map(category => ({
          ...category,
          image: this.getImageForCategory(category.name!) // الصورة بس
        }));
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }
  getImageForCategory(categoryName: string): string {
    const imageMap: { [key: string]: string } = {
      'سباكة': '/assets/images/plumbing.jpeg',
      'كهرباء': '/assets/images/electrical.jpeg',
      'نجارة': '/assets/images/joiner.jpeg',
      'دهانات ونقاشة': '/assets/images/debate.jpeg',
      'تركيب سيراميك وبلاط': '/assets/images/maintenance.jpeg',
      'حدادة وألمنيوم': '/assets/images/blacksmith.jpeg',
      'تنظيف وصيانة منازل': '/assets/images/cleaning.jpeg',
      'إصلاح أجهزة كهربائية': '/assets/images/elec_repair.jpeg',
      'صيانة المكيفات والتبريد': '/assets/images/conditioning.jpeg',
      'تصميم وحدات ديكور': '/assets/images/decor.jpeg'
    };
    return imageMap[categoryName] || '/assets/images/decor.jpeg';
  }

  selectedCategory: string = "";
  selectedArtisan: string = "";
  showAll = false;
  isChatboxOpen: boolean = false;



  // Get visible categories based on showAll state
  get visibleCategories() {
    return this.showAll ? this.categories : this.categories.slice(0, 6);
  }

  handleCategoryClick(serviceName: string) {
    this.selectedCategory = serviceName;
    //this.selectedArtisan = artisanName;
    const modal = document.getElementById('serviceModal');
    if (modal) {
      new bootstrap.Modal(modal).show();
    }
  }

  // Submit service request form
  submitRequestForm(): void {
    const modal = document.getElementById('serviceModal');
    if (modal) {
      bootstrap.Modal.getInstance(modal)?.hide();
    }

    this.router.navigate(['/service-payment'], {
      state: {
        ...this.formData,
        selectedCategory: this.selectedCategory,
        artisanName: this.selectedArtisan
      }
    });
  }

  // Toggle show all categories
  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  // After view initialization
  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'chat') {
        setTimeout(() => {
          this.scroller.scrollToAnchor('chat');
          this.openChat();
        }, 100);
      }
    });
  }

  // Open chat programmatically
  openChat(): void {
    if (this.chatComponent) {
      this.chatComponent.openChat();
      this.isChatboxOpen = true;
    } else {
      this.isChatboxOpen = false;
    }
  }

  // Handle chatbox opened/closed events
  onChatboxOpened(opened: boolean): void {
    this.isChatboxOpen = opened;
  }
}
