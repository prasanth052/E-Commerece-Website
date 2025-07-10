import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { LayoutComponent } from './layout/layout.component';
import { Sidebar } from 'primeng/sidebar';


const routes: Routes = [
  // ❌ Login and Auth routes (no layout)
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
   },

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
        path: 'newcart',
        loadChildren: () => import('./cartmodule/cartmodule.module').then(m => m.CartmoduleModule),
        data: { secondnavbar: true}
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
        data: { hideNavbar: true }
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
        data: { secondnavbar: true }
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: {userRole:'admin',hideNavbar: true ,secondnavbar: true }
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
