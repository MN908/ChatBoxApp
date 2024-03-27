import { Injectable } from '@angular/core';
import {  HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { environment } from '../Enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(private http: HttpClient) { }

  private hubConnection: HubConnection | null = null;

  messageReceived = new Subject<{ user: string, message: string }>();

  apiUrl: string = environment.apiUrl;
  private connectionStarted: boolean = false;

  startConnection() {
    if (!this.connectionStarted) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(this.apiUrl)
        .build();

      this.hubConnection.start()
        .then(() => {
          console.log('Connection started');
          this.connectionStarted = true;
        })
        .catch(err => console.error('Error while starting connection: ' + err));

      this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
        this.messageReceived.next({ user, message });
      });

      this.hubConnection.onclose(() => {
        console.log('Connection closed, attempting to restart...');
      });
    } else {
      console.log('Connection already started');
    }
  }

  public addReceiveMessageListener = (callback: (user: string, message: string) => void) => {
    if (this.hubConnection !== null) {
      this.hubConnection.on('ReceiveMessage', callback);
    }
  }

}
