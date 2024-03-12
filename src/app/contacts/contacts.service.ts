import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Observable, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contactSelectedEvent = new EventEmitter<Contact>()
  //contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  contactsListClone: Contact[];


  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  private contacts: Contact[] = [];

getContacts(): Contact[] {
  return this.contacts.slice();
}

getContact(id: string): Contact {
  return this.contacts.find((c) => c.id === id);
}

deleteContact(contact: Contact) {
  if (!contact) {
    return;
  }
  const pos = this.contacts.indexOf(contact);
  if (pos < 0) {
    return;
  }
  this.contacts.splice(pos, 1);
  this.contactListChangedEvent.next(this.contacts.slice());

  this.contactsListClone = this.contacts.slice();
  this.contactListChangedEvent.next(this.contactsListClone);
}

getMaxId(): number {
  let maxId = 0;
  for (let contact of this.contacts) {
    let currentId = parseInt(contact.id);
    if (currentId > maxId) {
      maxId = currentId
    }
  }
  return maxId;
}

addContact(newContact: Contact) {
  if (!newContact) {
    return;
  }

  this.maxContactId++;
  newContact.id = this.maxContactId.toString();
  this.contacts.push(newContact);
  this.contactsListClone = this.contacts.slice();
  this.contactListChangedEvent.next(this.contactsListClone);
}

updateContact(originalContact: Contact, newContact: Contact) {
  if (originalContact === undefined || originalContact === null) {
    return;
  }
  if (newContact === undefined || newContact === null) {
    return;
  }

  const position = this.contacts.indexOf(originalContact);
  if (position < 0) {
    return;
  }

  newContact.id = originalContact.id;
  this.contacts[position] = newContact;
  this.contactsListClone = this.contacts.slice();
  this.contactListChangedEvent.next(this.contactsListClone);

}

}