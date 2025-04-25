import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notification-details',
  imports: [CommonModule],
  templateUrl: './notification-details.component.html',
  styleUrl: './notification-details.component.css'
})
export class NotificationDetailsComponent implements OnChanges{
  @Input() notification: any;
  showPopup: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notification'] && this.notification) {
      this.showPopup = true; // تفعيل الـ popup عند تلقي بيانات جديدة
    }
  }

  closePopup() {
    this.showPopup = false; // إغلاق الـ popup
  }
}
