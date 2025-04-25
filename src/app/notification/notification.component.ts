import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../_services/notification.service';
import { NotificationDetailsComponent } from '../notification-details/notification-details.component';

@Component({
  selector: 'app-notification',
  imports: [CommonModule,NotificationDetailsComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  notifications: any[] = [];
  selectedNotification: any = null;

  constructor(private notificationService: NotificationService) {}

  get unreadCount(): number {
    return this.notificationService.getUnreadCount();
  }

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(data => {
      this.notifications = data;
    });
  }

  markAsRead(notification: any) {
    this.notificationService.markAsRead(notification);
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead();
  }

  deleteNotification(index: number) {
    this.notificationService.deleteNotification(index);
  }

  deleteAllNotifications() {
    this.notificationService.deleteAllNotifications();
  }

  openDetailsPopup(notification: any) {
    if (notification.unread) {
      this.markAsRead(notification);
    }
    this.selectedNotification = notification;
  }
}
