import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { OrderManageComponent } from './order-manage/order-manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgApexchartsModule } from "ng-apexcharts";
import { StockCheckComponent } from './stock-check/stock-check.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoryListComponent } from './category-list/category-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    ProductManageComponent,
    OrderManageComponent,
    DashboardComponent,
    StockCheckComponent,
    ProductaddComponent,
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    AdminRoutingModule,
    MatInputModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    MatDatepickerModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatButtonModule,MatAccordion,MatExpansionModule,
    MatDividerModule,MatToolbarModule
  ],
})
export class AdminModule {}
