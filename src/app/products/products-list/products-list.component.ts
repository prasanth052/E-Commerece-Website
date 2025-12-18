import { SharedService } from './../../shared/services/shared.service';
import {
  AfterViewInit,
  Component,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, retry } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from '../../core/api.service';
import { CartService } from '../../core/cart.service';
import { CustomSnackbarComponent } from '../../shared/custom-snackbar/custom-snackbar.component';
import { SnackbarService } from '../../shared/custom-snackbar/SnackbarService';

// import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  Products: any[] = [];
  displayedProducts: any[] = [];
  totalProducts: number = 0;
  ProdCards: number = 0;
  Prod_interval: any;
  Limit: number | null = null;
  // Track selected category
  filterMenuOpen: boolean = false; // Manage filter menu visibility
  isLoading:any
  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private SharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const bootstrap = await import('bootstrap'); // ✅ lazy-loaded only in browser

      const element = document.getElementById('carouselExampleSlidesOnly');
      if (element) {
        new bootstrap.Carousel(element, {
          interval: 5000,
          ride: 'carousel',
        });
      }
    }
  }
  loadingProductId: number | null = null;
  ngOnChanges(changes: SimpleChanges): void { }
  ngOnInit() {
    this.getProducts();
    this.SharedService.filteredProducts$.subscribe((filtered) => {
      this.displayedProducts = filtered;
      this.totalProducts = filtered.length;
    });
  }

  toggleWishlist(product: any) {
    console.log('Wishlist toggled', product);
  }

  openQuickView(product: any) {
    console.log('Quick view', product);
  }
  Math = Math;
  getProducts() {
    this.apiService.getAllproducts().subscribe({
      next: (res: any) => {
        this.Products = res.map((product: any) => ({
          ...product,
          finalPrice:
            product.basePrice - (product.basePrice * product.discount) / 100,
          stockStatus:
            product.stock === 0
              ? 'Out of Stock'
              : product.stock > 10
                ? 'In Stock'
                : 'Low Stock',
        }));

        this.totalProducts = this.Products.length;
        this.SharedService.setProducts(this.Products); // ✅ send finalPrice-ready products
      },
    });
  }


  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();
  snackbar=inject(SnackbarService)
  addToCart(product: any): void {

    const login: boolean = JSON.parse(localStorage.getItem('isLogin') || 'false');
    // if (!login) {
    //   this.router.navigate(['/login']);
    //   return;
    // }
    this.cartService.addToCart(product);  // ✅ no direct localStorage here
 this.snackbar.openSnackBar(product.productName, 'Added to cart!', 'success');
  }

  Sort(value: string) {
    switch (value) {
      case 'lowtohigh':
        this.SharedService.applySort('finalPrice', 'asc');
        break;
      case 'hightolow':
        this.SharedService.applySort('finalPrice', 'desc');
        break;
      case 'a-z':
        this.SharedService.applySort('title', 'asc');
        break;
      case 'z-a':
        this.SharedService.applySort('title', 'desc');
        break;
      default:
        this.SharedService.applySort('', 'asc'); // reset
        break;
    }
  }

  // revealProducts(): void {
  //   let index = 0;
  //   this.ProdCards = 0;
  //   clearInterval(this.Prod_interval);
  //   this.Prod_interval = setInterval(() => {
  //     if (index < this.displayedProducts.length) {
  //       this.ProdCards = index + 1;
  //       index++;
  //     } else {
  //       clearInterval(this.Prod_interval);
  //     }
  //   }, 200);
  // }

  // onLimitChange(): void {
  //   if (this.Limit && this.Limit > 0) {
  //     this.displayedProducts = this.Products.slice(0, this.Limit);
  //   } else {
  //     this.displayedProducts = [...this.Products];
  //   }
  //   this.revealProducts();
  // }

  // shortByEvent(e: any) {
  //   if (e.target.value === 'desc') {
  //     this.displayedProducts = this.displayedProducts.reverse();
  //     this.revealProducts();
  //   } else {
  //     this.displayedProducts = [...this.Products];
  //     this.revealProducts();
  //   }
  // }

  // Toggle filter menu visibility
  toggleFilterMenu() {
    this.filterMenuOpen = !this.filterMenuOpen;
  }
  goToProduct(product: any) {
    // return
    this.SharedService.setSelectedProduct(product);
    // this.SharedService.setProducts(product._id)
    this.router.navigate(['/products/product-details']);
  }
  ngOnDestroy() { }
}
