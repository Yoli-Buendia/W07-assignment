import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Observable, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;


  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  private documents : Document[] = [];

  getDocuments(): Document[] {
    return this.documents.slice();
  }
  getDocument(id: string): Document {
    return this.documents.find((c) => c.id === id);
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
 }

 
 getMaxId(): number {
  let maxId = 0;
  for (let document of this.documents) {
    let currentId = parseInt(document.id);
    if (currentId > maxId) {
      maxId = currentId
    }
  }
  return maxId;
}

addDocument(newDocument: Document) {
  if (!newDocument) {
    return;
  }

  this.maxDocumentId++
  let maxIdString = this.maxDocumentId.toString();
  newDocument.id = maxIdString;

  this.documents.push(newDocument);
  this.documentListChangedEvent.next(this.documents.slice());
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (originalDocument === undefined || originalDocument === null) {
    return;
  }
  if (newDocument === undefined || newDocument === null) {
    return;
  }

  const position = this.documents.indexOf(originalDocument);
  if (position < 0) {
    return;
  }

  newDocument.id = originalDocument.id;
  this.documents[position] = newDocument;
  this.documentListChangedEvent.next(this.documents.slice());
}
}


