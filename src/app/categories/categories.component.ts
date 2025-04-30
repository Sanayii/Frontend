import { CommonModule, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { SeriveRequesPaymentService } from '../_services/serive-reques-payment.service';
import { ServiceRequestViewModel } from '../_Models/serive-request-view-model';
import { DataServiceService } from '../_services/data-service.service';
import { ServiceRequestDetailsDto } from '../_dtos/serive-reques-details-dto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaymentMethod } from '../_enums/payment-method';
import { ChatComponent } from '../chat/chat.component';
import { Category } from '../_Models/category';
import { CategoryService } from '../_services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from '../_services/token.service';



@Component({
  selector: 'app-categories',
  imports: [CommonModule,FormsModule,RouterLink,ChatComponent,ReactiveFormsModule,HttpClientModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent  implements AfterViewInit {
  PayMethod: PaymentMethod = PaymentMethod.Cash;
  paymentMethods: string[] = Object.keys(PaymentMethod).filter(key => isNaN(Number(key)));
  static futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      return { notFutureDate: true };
    }
    return null;
  }

  CatgForm: FormGroup = new FormGroup({
    ServiceName: new FormControl('', Validators.required),
    ServiceDetails: new FormControl('', Validators.required),
    requestDate: new FormControl('', [Validators.required, CategoriesComponent.futureDateValidator]),
    paymentMethod: new FormControl('', Validators.required),
  });
  serviceRequest: ServiceRequestViewModel = new ServiceRequestViewModel(
    1,
    '',
    '',
    '',
    new Date(),
    0,
    PaymentMethod.Cash
  );
  Dto: ServiceRequestDetailsDto | null = null;
  categories: Category[] = [];
  @ViewChild(ChatComponent) chatComponent!: ChatComponent;

  formData = {
    firstName: '',
    lastName: '',
    contact: '',
    address: '',
    details: '',
    data:'',
    paymentMethod:''
  };
  customerId: string|null = '';
  constructor(private router: Router,
      private scroller: ViewportScroller,
      private route: ActivatedRoute,
      private categoryService: CategoryService,
      public Ser: SeriveRequesPaymentService,
      public dataService: DataServiceService,private  test: TokenService) {
        this.customerId = this.test.getUserIdFromToken();
      }
  // constructor(private customerService: CustomerService, private router: Router,private  test: TokenService) {
  //   this.customerId = this.test.getUserIdFromToken();
  //  }
  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories = data.map(category => ({
          ...category,
          image: this.getImageForCategory(category.name!) 
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

  get visibleCategories() {
    return this.showAll ? this.categories : this.categories.slice(0, 6);
  }

  handleCategoryClick(serviceName: string,seriveId:number) {
    this.selectedCategory = serviceName;
    this.serviceRequest.CategoryId = seriveId;
    const modal = document.getElementById('serviceModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }
  submitRequestForm() {
    if (this.CatgForm.valid) {
      const formValues = this.CatgForm.value;

      
      this.serviceRequest.CustomerId = this.customerId!;
      this.serviceRequest.Status = 1;
      this.serviceRequest.ServiceName = formValues.ServiceName;
      this.serviceRequest.Description = formValues.ServiceDetails;
      this.serviceRequest.RequestDate = new Date(formValues.requestDate);

      const modal = document.getElementById('serviceModal');
      if (modal) {
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal?.hide();
      }


      this.Ser.getRequsetdetails(this.serviceRequest).subscribe(
        (a: ServiceRequestDetailsDto) => {
          this.dataService.setServiceRequestDetails(a);
          this.router.navigate(['/service-payment']);
        }
      );

    } else {
      this.CatgForm.markAllAsTouched();
    }
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }


  //
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'chat') {
        setTimeout(() => {
          this.scroller.scrollToAnchor(fragment);
          this.openChat();
        }, 100); // small delay for safety
      }
    });
  }
  isChatboxOpen:boolean=false;

  openChat() {
    if (this.chatComponent) {
      this.chatComponent.openChat();
      this.isChatboxOpen = true;
    }
    else{
      this.isChatboxOpen=false;
    }
  }

  onChatboxOpened(opened: boolean) {
    this.isChatboxOpen = opened;
  }
}
