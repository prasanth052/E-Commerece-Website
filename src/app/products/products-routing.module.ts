import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent, // Must have <router-outlet> in its template
    children: [
      { path: '', component: ProductsListComponent , data: { Sidebar: true}},
      { path: 'filter', component: ProductFilterComponent, data: { Sidebar: true} },
      { path: 'product-details', component:ProductDetailsComponent , data: { Sidebar: false}} // ✅ This matches /products/1
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {

 }
