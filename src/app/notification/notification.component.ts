import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
 import { CommonModule } from '@angular/common'; // Also need this for ngFor etc
 import { Notification } from '../_Models/notification';
 import { NotificationDetailsComponent } from '../notification-details/notification-details.component';
 import { NotificationService } from '../_services/notification.service';
import { TokenService } from '../_services/token.service';
 @Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, NotificationDetailsComponent],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: Notification[] = [];
  selectedNotification: Notification | null = null;
  customerId: string | null = null;
  constructor(private notificationService: NotificationService,private tokenService: TokenService) {
    this.customerId = this.tokenService.getUserIdFromToken();
  }
  get unreadCount(): number {
    return this.notificationService.getUnreadCount();
  }

  ngOnInit(): void {
    this.notificationService.getAll(this.customerId).subscribe(data => {
      this.notifications = [...data];
      console.log('Notifications from API:', this.notifications); // Log API notifications
    });

    // Subscribe to the notifications observable from the service (for SignalR updates)
    this.notificationService.notifications$.subscribe(data => {
      // When data updates via SignalR, append new notifications to the list
      this.notifications = [...data];  // Update the notifications array with both API and SignalR notifications
      console.log('Updated notifications after SignalR push:', this.notifications); // Log updated notifications
    });
  }
  markAsRead(notification: Notification): void {
    this.notificationService.markAsRead(notification);
  }
  markAllAsRead(): void {
    this.notificationService.markAllAsRead(this.customerId!).subscribe((data) => {
      console.log(data);
    });
  }
  deleteNotification(index: number,id:number): void {
    this.notificationService.DeleteNotification(index,id).subscribe((data) => {
      console.log(data);
    });
  }
  deleteAllNotifications(): void {
    this.notificationService.deleteAllNotifications(this.customerId!).subscribe((data) => {
      console.log(data);
    });
  }

  openDetailsPopup(notification: Notification): void {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification); // هذا سيعدل ويحدّث القائمة
    }
    this.notificationService.MarkNotification(notification.id).subscribe((data) => {
      console.log(data);
      this.selectedNotification = notification;
    });
  }


  closePopup(): void {
    this.selectedNotification = null;
  }
}
