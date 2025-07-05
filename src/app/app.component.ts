import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CartService } from './service/cart.service';
import { SpinnerService } from './service/spinner.service';
import { ProductsService } from './service/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('sidenavState', [
      state('open', style({ width: '250px' })),
      state('closed', style({ width: '0' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'Prasanth';
  UserName: string = ''
  sidenavClass = 'lg';
  isSmallScreen: boolean = false;
  cartCount = 0;
  isLoading = false
  constructor(private cartService: CartService, private spinner: NgxSpinnerService, private prodService: ProductsService) { }
  ngOnInit() {
    // this.spinner.loading$.subscribe(val => {
    //   this.isLoading = val
    // })

    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }
  isSidenavOpen: boolean = true
  toggleSidenav() {
    this.isSidenavOpen = this.isSidenavOpen ? false : true
  }
  showMoreOptions = false;
  toggleMoreOptions() {
    this.showMoreOptions = false
  }
  discountOptions = [10, 25, 50, 70];
  selectedDiscounts: number[] = [];

  toggleDiscount(value: number) {
    const index = this.selectedDiscounts.indexOf(value);
    if (index > -1) {
      this.selectedDiscounts.splice(index, 1); // remove if already selected
    } else {
      this.selectedDiscounts.push(value); // add if not selected
    }
    this.prodService.applyFilter(this.selectedDiscounts, this.selectedPrice);

    console.log('Selected Discounts:', this.selectedDiscounts);
  }
  selectedPrice: any[] = []

  togglePrice(range: { min: number, max: number }) {
    const index = this.selectedPrice.findIndex(
      p => p.min === range.min && p.max === range.max
    );
    if (index > -1) {
      this.selectedPrice.splice(index, 1);
    } else {
      this.selectedPrice.push(range);
    }

    this.prodService.applyFilter(this.selectedDiscounts, this.selectedPrice);
    console.log('Selected price:', this.selectedPrice);
  }

 priceOptions = [
  { min: 0, max: 499 },
  { min: 500, max: 999 },
  { min: 1000, max: 1999 },
  { min: 2000, max: Infinity }
];
getPriceLabel(index: number): string {
  const range = this.priceOptions[index];
  if (range.max === Infinity) {
    return `₹${range.min} & Above`;
  } else if (range.min === 0) {
    return `Under ₹${range.max}`;
  } else {
    return `₹${range.min} – ₹${range.max}`;
  }
}


}
