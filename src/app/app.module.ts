import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './nav/nav.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { DatePipe, DecimalPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import { provideHttpClient  } from '@angular/common/http';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetalisComponent } from './products-detalis/products-detalis.component';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavComponent,

    ProductsListComponent,
    ProductsDetalisComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    MatCardModule,MatDividerModule,MatTableModule,MatRadioModule,MatSliderModule,
    MatInputModule, MatButtonModule, CanvasJSAngularChartsModule,MatExpansionModule,
    FormsModule, ReactiveFormsModule,MatPaginator,MatPaginatorModule,MatAccordion,
    SidebarModule, ButtonModule, RippleModule,MatSort,MatSortModule,MatButtonToggleModule,
    AvatarModule, StyleClassModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,

  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe, DecimalPipe, 
    provideClientHydration(), provideAnimationsAsync(), provideNativeDateAdapter(),provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
