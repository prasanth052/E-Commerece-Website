import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Must have <router-outlet> in its template
    children: [
      { path: 'nav', component: NavbarComponent },
      {path:'side',component:NavbarComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
