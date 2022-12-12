import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

// var contactsApi = "http://localhost:8100/";
var contactsApi = "http://localhost:8080/";
var httpLink = { 
  showAllContact: contactsApi+"api/contacts/showAll",
  createContact: contactsApi+"api/contacts/create",
  updateContact: contactsApi+"api/contacts/update/:id",
  deleteContact: contactsApi+"api/contacts/delete/",
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public showAllContact(): Observable<any> {
    return this.webApiService.get(httpLink.showAllContact);
  }
  public createContact(model : any): Observable<any> {
    return this.webApiService.post(httpLink.createContact, model);
  }
  public updateContact(id : any, model : any): Observable<any> {
    return this.webApiService.post(httpLink.updateContact + id, model);
  }
  public deleteContact(id : any): Observable<any> {
    return this.webApiService.delete(httpLink.deleteContact + id);
  }

}
