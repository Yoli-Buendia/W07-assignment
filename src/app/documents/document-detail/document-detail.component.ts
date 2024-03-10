import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../window-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
 document: Document;
 id: string;
 nativeWindow: any;


 constructor(
  private documentService: DocumentsService,
  private router: Router,
  private route: ActivatedRoute,
  private windRefService: WindRefService
  ) {
}

ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    this.id = params.id;
    this.document = this.documentService.getDocument(this.id);  
    this.nativeWindow = this.windRefService.getNativeWindow();
  });
}

onView(){
  if (this.document.url){
    this.nativeWindow.open(this.document.url);
  }
}

onDelete() {
  this.documentService.deleteDocument(this.document);
  this.router.navigate(['/documents'], {relativeTo: this.route});
}
}
