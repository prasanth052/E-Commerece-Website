import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

import { NavComponent } from './nav/nav.component';


import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetalisComponent } from './products-detalis/products-detalis.component';
import { DemoComponent } from './demo/demo.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { AuthGuard } from './auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { hideNavbar: true } },
  { path: 'allprod', component: NavComponent },
  { path: 'demo', component: DemoComponent },
  { path: '', component: ProductsListComponent },
  { path: 'product/:id', component: ProductsDetalisComponent },
  { path: 'cart', component: CartComponent, data: { secondnavbar: true, sidenavbar: true } },
  { path: 'address', component: AddressComponent, data: { secondnavbar: true, sidenavbar: true } },
  { path: 'checkout', component: OrdersComponent, data: { secondnavbar: true, sidenavbar: true } },
  { path: 'snackbar', component: CustomSnackbarComponent, data: {hideNavbar: true , secondnavbar: true, sidenavbar: true } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
