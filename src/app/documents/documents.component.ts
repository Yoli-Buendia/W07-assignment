import { Component } from '@angular/core';
import { Document } from './document.model';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})

export class DocumentsComponent {
  selectedDocument: Document;

  constructor(private documentService: DocumentsService){}

  ngOnInit(): void{
    this.documentService.documentSelectedEvent.subscribe((document: Document) => {
        this.selectedDocument = document;
    });
  }
}
