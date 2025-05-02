import { Injectable } from '@angular/core';
 import { BehaviorSubject } from 'rxjs';
 import * as signalR from '@microsoft/signalr';
 import { HttpClient } from '@angular/common/http';
 import { Notification } from '../_Models/notification';
import { TokenService } from './token.service';

 @Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];

  private _notifications$ = new BehaviorSubject<Notification[]>(this.notifications);
  notifications$ = this._notifications$.asObservable();

  private hubConnection: signalR.HubConnection;
  customerId: string|null=null;
  constructor(private http: HttpClient,private tokenService: TokenService) {
    this.customerId = this.tokenService.getUserIdFromToken();
    // Create SignalR connection to the Web API Hub
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7234/notificationHub")  // Replace with your Web API URL and Hub name
      .build();
    this.startConnection();
    this.setupListeners();

    // Fetch notifications from the API initially
    this.getAll(this.customerId).subscribe(data => {
      // Set the notifications array and emit the updated value to subscribers
      this.notifications = data;
      this._notifications$.next(this.notifications); // Emit to subscribers immediately
    });
  }

  private baseURL = "https://localhost:7234/api/Notification";

  // HTTP request to get all notifications from the API
  getAll(id: any) {
    return this.http.get<Notification[]>(`${this.baseURL}/${id}`);
  }
  
  // Start SignalR connection
  private async startConnection() {
    try {
      await this.hubConnection.start();
      console.log('SignalR connection established');
    } catch (err) {
      console.error('Error establishing SignalR connection: ', err);
      setTimeout(() => this.startConnection(), 5000);  // Retry if connection fails
    }
  }

  // Setup SignalR listeners
  private setupListeners() {
    // Listen for incoming notifications from the SignalR hub
    this.hubConnection.on('ReceiveNotification', (notification: Notification) => {
      // Append the new notification to the existing notifications array
      this.notifications = [...this.notifications, notification]; // This merges the existing notifications with the new one

      // Emit the updated notifications array to the subscribers
      this._notifications$.next(this.notifications);

      console.log("Updated notifications after SignalR:", this.notifications);
    });
  }

  // Get the unread count
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  // Mark a notification as read
  markAsRead(notification: Notification) {
    const index = this.notifications.findIndex(n => n.id === notification.id);
    if (index !== -1) {
      this.notifications[index].isRead = true;
      this._notifications$.next([...this.notifications]); // force update to subscribers
    }
  }

  // Mark all notifications as read
  markAllAsRead(id:string) {
    this.notifications.forEach(n => n.isRead = true); 
    this._notifications$.next(this.notifications);
    return this.http.get(`${this.baseURL}/MarkAsRead/${id}`);
  }

  // Delete a notification by index
  DeleteNotification(index: number,id:number) {
    this.notifications.splice(index, 1);
    this._notifications$.next(this.notifications);
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  MarkNotification(id:number) {
    // Make the GET request and return the observable
    return this.http.get(`${this.baseURL}/MarkNotification?customerid=${this.customerId}&id=${id}`);
  }

  // Delete all notifications
  deleteAllNotifications(id:string) {
    this.notifications = [];
    this._notifications$.next(this.notifications);
    return this.http.delete(`${this.baseURL}/DeleteCustomerNotification/${id}`);
  }
}
