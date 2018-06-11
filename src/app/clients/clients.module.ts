import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './components/client-listing/client-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from './services/client.service';
import { ClientFormComponent } from './components/client-form/client-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [ClientListingComponent, ClientFormComponent],
  exports: [ClientListingComponent],
  providers: [ClientService],
  entryComponents: [ClientFormComponent]
})
export class ClientsModule {}
