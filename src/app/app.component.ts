import { SharedService } from './shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { ApiService } from './core/api.service';
import { CartService } from './core/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('sidenavState', [
      state('open', style({ width: '250px' })),
      state('closed', style({ width: '0' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'Prasanth';
  UserName: string = '';
  sidenavClass = 'lg';
  isSmallScreen: boolean = false;
  cartCount = 0;
  isLoading = false;

  constructor(
    private router: Router,
    private prodService: ApiService,
    private SharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}
  hideNavbar = false;
  secondnavbar = false;
  sidenavbar = true;
  ngOnInit() {
    this.cartService.setCartCount(this.cartService.calculateInitialCount());

    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.getDeepestRoute(this.activatedRoute.root);
        this.hideNavbar = currentRoute.snapshot.data['hideNavbar'] || false;
        this.secondnavbar = currentRoute.snapshot.data['secondnavbar'] || false;
        this.sidenavbar = currentRoute.snapshot.data['sidenavbar'] || false;
        if (!this.sidenavbar) {
          this.isSidenavOpen = true;
        } else {
          this.isSidenavOpen = false;
        }
      });
  }

  getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  isSidenavOpen: boolean = true;
  toggleSidenav() {
    this.isSidenavOpen = this.isSidenavOpen ? false : true;
  }
  showMoreOptions = false;
  toggleMoreOptions() {
    this.showMoreOptions = false;
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
    this.SharedService.applyFilter(this.selectedDiscounts, this.selectedPrice);

    console.log('Selected Discounts:', this.selectedDiscounts);
  }
  selectedPrice: any[] = [];

  togglePrice(range: { min: number; max: number }) {
    const index = this.selectedPrice.findIndex(
      (p) => p.min === range.min && p.max === range.max
    );
    if (index > -1) {
      this.selectedPrice.splice(index, 1);
    } else {
      this.selectedPrice.push(range);
    }

    this.SharedService.applyFilter(this.selectedDiscounts, this.selectedPrice);
    console.log('Selected price:', this.selectedPrice);
  }

  priceOptions = [
    { min: 0, max: 499 },
    { min: 500, max: 999 },
    { min: 1000, max: 1999 },
    { min: 2000, max: Infinity },
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
  searchValue: string = '';
  searchEvent(e: any) {
    this.searchValue = e.target.value;
    this.SharedService.Search(this.searchValue);
  }
  Searchbtn() {
    this.SharedService.Search(this.searchValue);
  }
}
