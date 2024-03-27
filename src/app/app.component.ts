import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalRService } from '../services/signal-r.service';
import { CommonModule } from '@angular/common';
import { message } from '../Models/message';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { messagecreaterequest } from '../Models/Request/messagecreaterequest';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild('messageInput', { static: false }) messageInputRef: ElementRef | undefined;
  public messageDataReturned: message[] = [];
  messageData: messagecreaterequest = new messagecreaterequest();
  messages: { user: string, message: string }[] = [];

  constructor(private chatService: SignalRService, private messageService: MessagesService) { }


  ngOnInit(): void {
    this.chatService.startConnection();
    this.chatService.addReceiveMessageListener((user, message) => {
      this.messages.push({ user: user, message: message });
    });
  }

  sendMessage() {

    if (this.messageInputRef != null) {

      this.messageData.content = this.messageInputRef.nativeElement.value;

      this.messageData.MessageFrom = 'Anonymous';

      this.messageService.sendMessage(this.messageData).subscribe(
        (result) => {
          this.messageDataReturned = result;
          console.log(result);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}



