import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] =[];
  subscription: Subscription;


  constructor(private documentService: DocumentsService) {}

  ngOnInit(){
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documentsList: Document[]) => {
          this.documents = documentsList;
        },
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
