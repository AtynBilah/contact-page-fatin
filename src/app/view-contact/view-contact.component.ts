import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { WebApiService } from '../Service/web-api.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit{
  contactId: any = "";
  contactDetails : any= [];

  constructor(private router: Router, private httpProvider: HttpProviderService, private route: ActivatedRoute, public webApiService: WebApiService,){
    
  }

 ngOnInit(): void {
  this.contactId = this.route.snapshot.queryParamMap.get('id');
  if(this.contactId != null){
    this.populateContact(this.contactId);
  }
 }

 populateContact(id: any){
  this.httpProvider.getOneContact(id).subscribe((data : any) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        console.log(resultData);
        this.contactDetails = resultData;
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



}
