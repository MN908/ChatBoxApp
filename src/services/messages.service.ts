import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { message } from '../Models/message';
import { environment } from '../Enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }
  apiUrl: string = environment.api;

  sendMessage(messageData: any): Observable<message[]> {
    return this.http.post<message[]>(`${this.apiUrl}/Messages/Create`, messageData);
  }
}
