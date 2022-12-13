import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  closeBtn = '';
  contactsList : any = [];

  constructor(private router: Router, private httpProvider : HttpProviderService){  }

  ngOnInit(): void {
    this.showAllContacts();
  }

  //showAll api called
  async showAllContacts() {
    this.httpProvider.showAllContact().subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.contactsList = resultData;
          console.log(this.contactsList);
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.contactsList = [];
            }
          }
        }
      });
  }

  viewContact(contactId: any){
    this.router.navigate(['viewContact'],
    {queryParams: {id:contactId}});
  }

  deleteContact(id: any) {
    this.httpProvider.deleteContact(id).subscribe((data : any) => {
      if (data != null) {
        var resultData = data.message;
        console.log(resultData);
        if (resultData != null) { 
          this.showAllContacts();
        }
      }
    },
    (error : any) => {});
  }

  editContact(contactId: any) {
    this.router.navigate(['AddContact'],
    {queryParams: {id:contactId, isEdit:true}});
    console.log("id = " + contactId);
  }

  gotoAddContact(){
    this.router.navigate(['AddContact']);
  }
  
}

