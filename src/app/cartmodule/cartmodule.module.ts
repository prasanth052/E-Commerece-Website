import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartmoduleRoutingModule } from './cartmodule-routing.module';
import { CartmoduleComponent } from './cartmodule.component';
import { CartComponent } from './cart/cart.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';


@NgModule({
  declarations: [
    CartmoduleComponent,
    CartComponent,
    CartSummaryComponent
  ],
  imports: [
    CommonModule,
    CartmoduleRoutingModule
  ]
})
export class CartmoduleModule { }
