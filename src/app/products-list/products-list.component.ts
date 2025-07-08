import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit, OnDestroy, OnChanges {
  Products: any[] = [];
  displayedProducts: any[] = [];
  totalProducts: number = 0;
  ProdCards: number = 0;
  Prod_interval: any;
  Limit: number | null = null;
  // Track selected category
  filterMenuOpen: boolean = false; // Manage filter menu visibility
  constructor(private service: ProductsService, private router: Router, private cartService: CartService) { }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnInit() {

    this.getProducts();
  }
  Math = Math;
  getProducts() {
    this.service.getAllproducts().subscribe({
      next: (res: any) => {
        this.Products = res.products;
        this.totalProducts = this.Products.length;
        this.displayedProducts = [...this.Products]
        this.service.setProducts(this.displayedProducts)
        this.service.filteredProducts$.subscribe(products => {
          this.displayedProducts = products;
          this.revealProducts();
        });
      },
    });
    console.log(this.displayedProducts);

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
      alert(`${product.title} has been added to your cart!`);
    } else {
      this.router.navigate(['/login']);
    }
  }
  Sort(value: any) {
    if (value === 'lowtohigh') {
      this.displayedProducts = this.displayedProducts.sort((a: any, b: any) => a.price - b.price)
    } else {
      this.displayedProducts = this.displayedProducts.sort((a: any, b: any) => b.price - a.price)
    }
  }
  revealProducts(): void {
    let index = 0;
    this.ProdCards = 0;
    clearInterval(this.Prod_interval);
    this.Prod_interval = setInterval(() => {
      if (index < this.displayedProducts.length) {
        this.ProdCards = index + 1;
        index++;
      } else {
        clearInterval(this.Prod_interval);
      }
    }, 200);
  }

  onLimitChange(): void {
    if (this.Limit && this.Limit > 0) {
      this.displayedProducts = this.Products.slice(0, this.Limit);
    } else {
      this.displayedProducts = [...this.Products];
    }
    this.revealProducts();
  }

  shortByEvent(e: any) {
    if (e.target.value === 'desc') {
      this.displayedProducts = this.displayedProducts.reverse();
      this.revealProducts();
    } else {
      this.displayedProducts = [...this.Products];
      this.revealProducts();
    }
  }

  // Toggle filter menu visibility
  toggleFilterMenu() {
    this.filterMenuOpen = !this.filterMenuOpen;
  }
  goToDetail(product: any): void {
    this.router.navigate(['/product', product.id]);
  }

  ngOnDestroy() {

  }
}
