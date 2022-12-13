import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  addContactForm: contactForm = new contactForm();

  @ViewChild("contactForm")
  employeeForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(private router: Router, private httpProvider: HttpProviderService){}

  ngOnInit(): void {}
  
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
}
