import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

// Import
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    ProductFilterComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule, MatDividerModule, MatTableModule, MatRadioModule, MatSliderModule, MatAutocompleteModule, MatGridListModule,
    MatInputModule, MatButtonModule, CanvasJSAngularChartsModule, MatExpansionModule, MatMenuModule, NgxSpinnerModule,
    FormsModule, ReactiveFormsModule, MatPaginator, MatPaginatorModule, MatAccordion, GoogleMapsModule,
    SidebarModule, RippleModule, MatSort, MatSortModule, MatButtonToggleModule, MatDialogModule,
    AvatarModule, StyleClassModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,
    MatSnackBarModule, MatTooltipModule
  ]
})
export class ProductsModule { }
