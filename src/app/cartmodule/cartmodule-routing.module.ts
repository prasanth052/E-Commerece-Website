import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartmoduleComponent } from './cartmodule.component';

import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CartComponent } from '../cartmodule/cart/cart.component'

const routes: Routes = [
  {
    path: '', component: CartmoduleComponent, // Must have <router-outlet> in its template
    children: [
      { path: 'cartnew', component: CartComponent },
      { path: 'cartsummary', component: CartSummaryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartmoduleRoutingModule { }
