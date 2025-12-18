import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    CustomSnackbarComponent
  ],
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatIcon
]
})
export class SharedModule { }
