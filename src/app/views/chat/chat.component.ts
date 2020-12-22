import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message, SendMessageEvent, User } from '@progress/kendo-angular-conversational-ui';
import { interval, merge, Observable, Subject } from 'rxjs';
import {map, scan} from 'rxjs/operators'
import { ChatService } from 'src/app/services/chat.service';
import  TwilioChat  from 'twilio-chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{


  public user:User;
  public client:any;
  public channel:any;
  public messages:Array<any>;
  public subject = new Subject<any>();
  public messages$ = this.subject.asObservable();

  constructor(private chatService:ChatService,private route:ActivatedRoute) {
    this.route.params.subscribe(params=>{
      this.user = {
        id : params.name,
        name:params.name
      }
      this.initiateTwilioChat();
    })
    
  }
  ngOnInit(): void {
  }

  initiateTwilioChat() {

    var self = this;
    this.chatService.getTwilioToken(this.user.name).then(res=>{
      TwilioChat.create(res['token']).then(client => {
        self.client = client;
        self.setupChatClient();
      }).catch(err=>{
        console.log(err);
      })
      }).catch(err=>{
        console.log(err);
      })
      

  }
  setupChatClient() {
    
    this.client
      .getChannelByUniqueName('general2')
      .then(channel => {
        return channel;
      })
      .catch(error => {
        if (error.body.code === 50300) {
          return this.client.createChannel({ uniqueName: 'general2' });
        } else {
          this.handleError(error);
        }
      })
      .then(channel => {
        this.channel = channel;
        return this.channel.join().catch(() => {});
      })
      .then(() => {
        this.channel.getMessages().then(res=>{
          this.messagesLoaded(res);
        });
        this.channel.on('messageAdded', (message)=>{
          this.messageAdded(message);
        });
      })
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
  }

  twilioMessageToKendoMessage(message) {
    return {
      text: message.body,
      author: { id: message.author, name: message.author },
      timestamp: message.timestamp
    };
  }

  messagesLoaded(messagePage) {
    this.messages = messagePage.items.map(item=>{
      return this.twilioMessageToKendoMessage(item);
    })
    this.subject.next([...this.messages]);
  }

  messageAdded(message){
    this.messages.push(this.twilioMessageToKendoMessage(message.state));
    this.subject.next([...this.messages]);
  }

  public sendMessage(e: SendMessageEvent): void {
    this.channel.sendMessage(e.message.text);
  }

  // ngOnDestroy(){
  //   this.client.shutdown();
  // }
}
