import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

import { NavComponent } from './nav/nav.component';


import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetalisComponent } from './products-detalis/products-detalis.component';
import { DemoComponent } from './demo/demo.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './addres/address.component';
import { AuthGuard } from './auth.guard';
import { OrdersComponent } from './orderss/orders.component';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  // ❌ Login and Auth routes (no layout)
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  // ✅ All routes that need navbar/sidebar go under LayoutComponent
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cartmodule/cartmodule.module').then(m => m.CartmoduleModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },

  // ⚠️ Wildcard/fallback route (optional)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
