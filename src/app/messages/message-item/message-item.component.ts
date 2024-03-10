import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactsService } from '../../contacts/contacts.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit{
  @Input() message: Message;
  messageSender: string;
  constructor(private contactsService: ContactsService) {}
  ngOnInit() {
     const contact: Contact = this.contactsService.getContact(this.message.sender);
     this.messageSender = contact.name;
  }
}
