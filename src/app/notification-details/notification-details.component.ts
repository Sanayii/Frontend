import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Notification } from '../_Models/notification';

@Component({
  selector: 'app-notification-details',
  standalone: true, // ✅ Important: standalone: true
  imports: [CommonModule], // ✅ Required for *ngIf inside HTML
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnChanges {
  @Input() notification: Notification | null = null; // ✅ Input for 'notification'
  showPopup: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notification'] && this.notification) {
      this.showPopup = true;
    }
  }

  closePopup() {
    this.showPopup = false;
  }
}
