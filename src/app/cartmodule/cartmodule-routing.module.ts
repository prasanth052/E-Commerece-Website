import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartmoduleComponent } from './cartmodule.component';

const routes: Routes = [{ path: '', component: CartmoduleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartmoduleRoutingModule { }
