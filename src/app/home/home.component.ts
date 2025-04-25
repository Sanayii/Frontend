import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { ChatComponent } from '../chat/chat.component';
import { RouterLink } from '@angular/router';

@Component({
  imports:[ChatComponent,RouterLink],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements AfterViewInit {
  @ViewChild('servicesSwiper', { static: false }) servicesSwiper!: ElementRef;
  @ViewChild('ReviewSwiper', { static: false }) ReviewSwiper!: ElementRef;

  constructor() {}

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
}
