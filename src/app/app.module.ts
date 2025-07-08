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
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch  } from '@angular/common/http';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetalisComponent } from './products-detalis/products-detalis.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DemoComponent } from './demo/demo.component';
import{MatTooltipModule} from '@angular/material/tooltip'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';

// PrimeNG Modules
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CartComponent } from './cart/cart.component';
import { HttpinterceptorService } from './Interceptor/httpinterceptor.service';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavComponent,

    ProductsListComponent,
    ProductsDetalisComponent,
    DemoComponent,
    CartComponent,
    AddressComponent,
    OrdersComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    MatCardModule,MatDividerModule,MatTableModule,MatRadioModule,MatSliderModule,MatAutocompleteModule,MatGridListModule,
    MatInputModule, MatButtonModule, CanvasJSAngularChartsModule,MatExpansionModule,MatMenuModule,NgxSpinnerModule,
    FormsModule, ReactiveFormsModule,MatPaginator,MatPaginatorModule,MatAccordion,GoogleMapsModule,
    SidebarModule, ButtonModule, RippleModule,MatSort,MatSortModule,MatButtonToggleModule,MatDialogModule,
    AvatarModule, StyleClassModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,
    PanelModule,
    CardModule,
    TableModule,
    ChartModule,
    ToolbarModule,MatTooltipModule
  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe, DecimalPipe, 
    provideClientHydration(), provideAnimationsAsync(), provideNativeDateAdapter(),provideHttpClient(),
    provideHttpClient(withFetch()),
     {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
