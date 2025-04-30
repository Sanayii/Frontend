import { Injectable } from '@angular/core';
 import { BehaviorSubject } from 'rxjs';
 import * as signalR from '@microsoft/signalr';
 import { HttpClient } from '@angular/common/http';
 import { Notification } from '../_Models/notification';

 @Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];
   
  private _notifications$ = new BehaviorSubject(this.notifications);
  notifications$ = this._notifications$.asObservable();

  private hubConnection: signalR.HubConnection;

  constructor(private http: HttpClient) {
    // Create SignalR connection to the Web API Hub
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7234/notificationHub")  // Replace with your Web API URL and Hub name
      .build();
    this.startConnection();
    this.setupListeners();

    this.getAll().subscribe(data => {
      // Ensure you append API data to the existing notifications array
      this.notifications = [...data];
      console.log('Notifications from API:', this.notifications); // Log API notifications
    });
  }

  private baseURL = "https://localhost:7234/api/Notification";

  // HTTP request to get all notifications from the API
  getAll() {
    return this.http.get<Notification[]>(this.baseURL);
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
      console.log("From Hub Listener:", notification);
  
      // Append the new notification to the existing notifications
      this.notifications = [...this.notifications, notification]; // This merges the existing notifications with the new one
  
      // Emit the updated notifications array to the subscribers
      this._notifications$.next(this.notifications);
  
      console.log("Updated notifications after SignalR:", this.notifications);
    });
  }
  
  getUnreadCount(): number {
    return this.notifications.filter(n => n.isRead==false).length;
  }
   // Mark a notification as read
   markAsRead(notification: Notification) {
    notification.isRead = false;
    this._notifications$.next(this.notifications);
  }
  markAllAsRead() {
    this.notifications.forEach(n => n.isRead = false);
    this._notifications$.next(this.notifications);
  }
  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
    this._notifications$.next(this.notifications);
  }
  // Delete all notifications
  deleteAllNotifications() {
    this.notifications = [];
    this._notifications$.next(this.notifications);
  }
}