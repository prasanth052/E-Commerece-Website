import { DashboardComponent } from './dashboard/dashboard.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StockCheckComponent } from './stock-check/stock-check.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'stockcheck', component: StockCheckComponent, data: {userRole:'admin',hideNavbar: true ,secondnavbar: true } },
      { path: 'prodctmanage', component: ProductManageComponent , data: {userRole:'admin',hideNavbar: true ,secondnavbar: true }},
       { path: 'productadd', component: ProductaddComponent , data: {userRole:'admin',hideNavbar: true ,secondnavbar: true }},
       { path: 'Catglist', component: CategoryListComponent , data: {userRole:'admin',hideNavbar: true ,secondnavbar: true }},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
