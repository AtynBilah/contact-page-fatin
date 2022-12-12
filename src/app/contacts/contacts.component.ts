import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';

//Form
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  closeBtn = '';
  contactsList : any = [];

  //Form
  addContactForm : contactForm = new contactForm();
  contactForm!: NgForm;
  isSubmitted: boolean = false;

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

  deleteContact(id: any) {
    console.log("id = " + id);
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

  UpdateContact() {
    
  }

  AddContact(){
    this.isSubmitted = true;
    // console.log("Add Contact Clicked. isValid = " + isValid);
    if (this.isSubmitted) {
      this.httpProvider.createContact(this.addContactForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              console.log("Success Added Contact " + resultData.message);
            }
          }
        }
      },
        async error => {
          console.log("Error Added Contact " + error);
        });
    }
  } 
  
}

  //Form
  export class contactForm {
    name : String = "";
    email : String = "";
    phone : String = "";
    address : String = "";
    gender : String = "";
  }

