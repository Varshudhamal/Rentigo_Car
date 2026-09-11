import * as signalR from '@microsoft/signalr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private hubConnection!: signalR.HubConnection;

  startConnection() {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5068/notificationHub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected');
      })
      .catch(err => {
        console.log(err);
      });

  }

  addNotificationListener(callback: any) {

    this.hubConnection.on(
      'ReceiveNotification',
      (message) => {
        callback(message);
      }
    );

  }

}