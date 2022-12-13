import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ViewContactComponent } from './view-contact/view-contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'Contacts', pathMatch: 'full'},
  { path: 'Contacts', component: ContactsComponent },
  { path: 'AddContact', component: AddContactComponent },
  { path: 'ViewContact', component: ViewContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
