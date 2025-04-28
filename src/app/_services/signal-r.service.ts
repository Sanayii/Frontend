import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    // Create the SignalR connection to the hub
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:723/notificationHub')  // Web API SignalR Hub URL
      .build();
  }

  // Start the connection and listen for notifications
  startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection established!');
      })
      .catch(err => {
        console.error('Error while starting connection: ' + err);
      });
  }

  // Listen for notifications from the server
  addNotificationListener(): void {
    this.hubConnection.on('ReceiveNotification', (notification: any) => {
      console.log('Received notification:', notification);
      // Handle the notification (e.g., show a toast, update UI, etc.)
    });
  }

  stopConnection(): void {
    this.hubConnection.stop().then(() => {
      console.log('SignalR connection stopped');
    });
  }
}
