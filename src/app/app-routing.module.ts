import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

import { NavComponent } from './nav/nav.component';


import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetalisComponent } from './products-detalis/products-detalis.component';


const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'dash', component: NavComponent },

  { path: 'allprod', component: ProductsListComponent },
  { path: 'product/:id', component: ProductsDetalisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
