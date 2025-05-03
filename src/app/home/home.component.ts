import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Router, RouterLink } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';
import { AccountService } from '../_services/account.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@microsoft/signalr';
import { ContactFormService } from '../_services/contact-form.service';
import { ContactFormDto } from '../_Models/ContactForm';
import { CommonModule } from '@angular/common';


@Component({
  imports:[RouterLink,CategoriesComponent,ReactiveFormsModule,CommonModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements AfterViewInit {
  contactForm: FormGroup ;

  @ViewChild('servicesSwiper', { static: false }) servicesSwiper!: ElementRef;
  @ViewChild('ReviewSwiper', { static: false }) ReviewSwiper!: ElementRef;

  constructor(
    public login:AccountService,
    private router : Router,
    private fb: FormBuilder,
    //private http: HttpClient,
    private contactService: ContactFormService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }


  navigateToCategories() {
    if (this.login.isLogged) {
      this.router.navigate(['/categories']);
    } else {
      alert('Please login first.');
    }
  }

  ngAfterViewInit(): void {
    // Initialize Services Swiper
    setTimeout(() => {
      new Swiper(this.servicesSwiper.nativeElement, {
        slidesPerView: 4,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        pagination: {
          el: '.services-pagination',
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        },
      });
    }, 0);

    // Initialize Customer Review Swiper
    setTimeout(() => {
      new Swiper(this.ReviewSwiper.nativeElement, {
        loop: true,
        pagination: {
          el: '.review-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    }, 0);
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      // Mark every control in the form as touched
      this.contactForm.markAllAsTouched();
      return;
    }
    if (this.contactForm?.valid) {
      const data: ContactFormDto = this.contactForm.value;

      this.contactService.sendContactMessage(data).subscribe({
        next: () => {
          alert('Message sent successfully');
          this.contactForm.reset();
        },
        error: err => alert('Error sending message: ' + err.message)
      });
    }
  }
}
