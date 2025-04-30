import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
 import { CommonModule } from '@angular/common'; // Also need this for ngFor etc
 import { Notification } from '../_Models/notification';
 import { NotificationDetailsComponent } from '../notification-details/notification-details.component'; 
 import { NotificationService } from '../_services/notification.service';
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

  constructor(private notificationService: NotificationService) {
  }
  get unreadCount(): number {
    return this.notificationService.getUnreadCount();
  }

  ngOnInit(): void {
    // Fetch notifications from the API initially
    this.notificationService.getAll().subscribe(data => {
      // Ensure you append API data to the existing notifications array
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
    this.notificationService.markAllAsRead();
  }
  deleteNotification(index: number): void {
    this.notificationService.deleteNotification(index);
  }
  deleteAllNotifications(): void {
    this.notificationService.deleteAllNotifications();
  }
  openDetailsPopup(notification: Notification): void {
    if (notification.isRead) {
      this.markAsRead(notification);
    }
    this.selectedNotification = notification;
  }
  closePopup(): void {
    this.selectedNotification = null;
  }
}
  