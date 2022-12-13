import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  addContactForm: contactForm = new contactForm();
  isEdit : Boolean = false;
  contactId: any = "";

  @ViewChild("contactForm")
  employeeForm!: NgForm;
  isSubmitted: boolean = false;
  isUpdated: boolean = false;
  constructor(private router: Router, private httpProvider: HttpProviderService, private route: ActivatedRoute){}

  ngOnInit(): void {
    //Only when the edit button is pressed will these pass value
    this.contactId = this.route.snapshot.queryParamMap.get('id');
    this.isEdit = !!this.route.snapshot.queryParamMap.get('isEdit');
    if(this.contactId != null){
      this.populateContact(this.contactId);
    }
    console.log('contactId = '+this.contactId+" isEdit = "+this.isEdit);
  }
  
  AddContact(){
    this.isSubmitted = true;
    // console.log("Add Contact Clicked. isValid = " + isValid);
    if (this.isSubmitted) {
      this.httpProvider.createContact(this.addContactForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null) {
              console.log("Success Added Contact " + resultData);
              this.router.navigate(['/Contacts']);
            }
          }
        }
      },
        async error => {
          console.log("Error Added Contact " + error);
        });
    }
  }

  UpdateContact() {
    this.isUpdated = true;
    if (this.isUpdated && this.contactId != null) {
      this.httpProvider.updateContact(this.contactId, this.addContactForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null) {
              console.log("Success Updated Contact " + resultData);
              this.router.navigate(['/Contacts']);
            }
          }
        }
      },
        async error => {
          console.log("Error Update Contact " + error);
        });
    }
  }

  populateContact(id: any){
    this.httpProvider.getOneContact(id).subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          console.log(resultData);
          this.addContactForm.name = resultData.name;
          this.addContactForm.email = resultData.email;
          this.addContactForm.phone = resultData.phone;
          this.addContactForm.address = resultData.address;
          this.addContactForm.gender = resultData.gender;
          this.addContactForm.password = resultData.password;

        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              // this.contactsList = [];
              console.log(error.error.message);
            }
          }
        }
      });
  }
 
  closeBtn() {
    this.router.navigate(['/Contacts']);
  }

}

export class contactForm {
  name : String = "";
  email : String = "";
  phone : String = "";
  address : String = "";
  gender : String = "";
  password : String = "";
}
