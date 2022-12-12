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

  AddContact(){
    console.log("Add Contact Btn Clicked ");
  }

 
  deleteContact(id: any) {
    this.httpProvider.deleteContact(id).subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData != null && resultData.isSuccess) {
          this.showAllContacts();
        }
      }
    },
    (error : any) => {});
  }
  
}


