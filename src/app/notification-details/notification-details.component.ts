import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Notification } from '../_Models/notification';
import { UnderscoreToSpacePipe } from '../underscore-to-space.pipe';

@Component({
  selector: 'app-notification-details',
  standalone: true, 
  imports: [CommonModule,UnderscoreToSpacePipe], 
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnChanges {
  @Input() notification: Notification | null = null; 
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
