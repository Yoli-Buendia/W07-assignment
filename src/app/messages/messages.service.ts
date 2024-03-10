import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from '../messages/MOCKMESSAGES';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  messagesChangedEvent = new EventEmitter<Message[]>();
  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  private messages: Message[] = [];

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message{
    return this.messages.find((c) => c.id === id);
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.messagesChangedEvent.emit(this.messages.slice());
  }

}
