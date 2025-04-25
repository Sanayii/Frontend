import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  private notifications = [
    { id: 1, text: "Notification 1 content", time: "1 min ago",details: "More details about this notification.", unread: true },
    { id: 2, text: "Notification 2 content", time: "1 min ago",details: "More details about this notification.", unread: true },
    { id: 3, text: "Notification 3 content", time: "1 min ago",details: "More details about this notification.", unread: true },
    { id: 4, text: "Notification 4 content", time: "1 min ago",details: "More details about this notification.", unread: true },
    { id: 5, text: "Notification 5 content", time: "1 min ago",details: "More details about this notification.", unread: false },
    { id: 6, text: "Notification 6 content", time: "1 min ago",details: "More details about this notification.", unread: false },
  ];

  private _notifications$ = new BehaviorSubject(this.notifications);
  notifications$ = this._notifications$.asObservable();

  getUnreadCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }

  markAsRead(notification: any) {
    notification.unread = false;
    this._notifications$.next(this.notifications);
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.unread = false);
    this._notifications$.next(this.notifications);
  }

  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
    this._notifications$.next(this.notifications); // Update the observable stream
  }

  deleteAllNotifications() {
    this.notifications = [];
    this._notifications$.next(this.notifications); // Update the observable stream
  }

}
