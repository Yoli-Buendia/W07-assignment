import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})

export class ContactsComponent {
  selectedContact: Contact;

  constructor(private contactService: ContactsService){}
  
  ngOnInit(): void {
  this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
    this.selectedContact = contact;
  });
}
}
