import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { LocationModalComponent } from './location-modal/location-modal.component';


@NgModule({
  declarations: [
    AddressComponent,
    LocationModalComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule
  ]
})
export class AddressModule { }
