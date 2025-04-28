import { CommonModule, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat/chat.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ChatComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements AfterViewInit {
  // Reference to the ChatComponent child
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

  // Available service categories
  categories = [
    { name: 'Plumbing', image: '/assets/images/plumbing.jpeg', artisan: 'Ahmed Mohamed' },
    { name: 'Electricity', image: '/assets/images/electrical.jpeg', artisan: 'Mohamed Hassan' },
    { name: 'Carpentry', image: '/assets/images/joiner.jpeg', artisan: 'Ali Mohamed' },
    { name: 'Painting and Decorating', image: '/assets/images/debate.jpeg', artisan: 'Ali Hassan' },
    { name: 'Ceramic and tile installation', image: '/assets/images/maintenance.jpeg', artisan: 'Mohsen Saber' },
    { name: 'Blacksmithing and Aluminum', image: '/assets/images/blacksmith.jpeg', artisan: 'Ali Saber' },
    { name: 'House cleaning and maintenance', image: '/assets/images/cleaning.jpeg', artisan: 'Samir sayed' },
    { name: 'Electrical appliance repair', image: '/assets/images/elec_repair.jpeg', artisan: 'Alaa shaker' },
    { name: 'Air conditioning and refrigeration maintenance', image: '/assets/images/conditioning.jpeg', artisan: 'Khaled mohamed' },
  ];

  selectedCategory: string = "";
  selectedArtisan: string = "";
  showAll = false;
  isChatboxOpen: boolean = false;

  constructor(
    private router: Router,
    private scroller: ViewportScroller,
    private route: ActivatedRoute
  ) {}

  // Get visible categories based on showAll state
  get visibleCategories() {
    return this.showAll ? this.categories : this.categories.slice(0, 6);
  }

  // Handle category card click
  handleCategoryClick(serviceName: string, artisanName: string): void {
    this.selectedCategory = serviceName;
    this.selectedArtisan = artisanName;
    this.openServiceModal();
  }

  // Open the service request modal
  private openServiceModal(): void {
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
