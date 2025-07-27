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
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, retry } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from '../../core/api.service';
import { CartService } from '../../core/cart.service';
import { CustomSnackbarComponent } from '../../shared/custom-snackbar/custom-snackbar.component';

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
  ngOnChanges(changes: SimpleChanges): void { }
  ngOnInit() {
    this.getProducts();
      this.SharedService.filteredProducts$.subscribe((filtered) => {
    this.displayedProducts = filtered;
    this.totalProducts = filtered.length;
  });
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
  addToCart(product: any): void {
    const login: boolean = JSON.parse(localStorage.getItem('isLogin') || '[]');
    if (login) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProduct = cart.find((item: any) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartItemsSubject.next(cart.length);
      this.cartService.triggerUpdate();
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          title: product.title,
          message: 'added to cart!',
          type: 'success', // or 'error', 'warning'
        },
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-panel'], // Optional class
      });
    } else {
      this.router.navigate(['/login']);
    }
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
