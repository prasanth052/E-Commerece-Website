import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DatePipe,
  DecimalPipe,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { DemoComponent } from './demo/demo.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './shared/shared.module';
// PrimeNG Modules


import { HttpinterceptorService } from './Interceptor/httpinterceptor.service';
import { LayoutModule } from './layout/layout.module';
@NgModule({
  declarations: [AppComponent, DemoComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    LayoutModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe,
    DecimalPipe,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
