import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { map } from 'rxjs/operators';
import { log } from 'console';
import { Router } from '@angular/router';

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
  constructor(private service: ProductsService, private router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {

  }


  selectedCategory: any
  ngOnInit() {

    this.getProducts();
  }

  getProducts() {
    this.service.getAllproducts().subscribe({
      next: (res: any) => {
        this.Products = res;
        this.totalProducts = this.Products.length;
        this.displayedProducts = [...this.Products];
        this.service.selectedCategory$.subscribe((category: string) => {
          this.selectedCategory = category;
          console.log(this.selectedCategory, 'cat');
          if (!this.selectedCategory) {
            this.displayedProducts = [...this.Products];
          } else {
            let products = this.Products.filter(product =>
              product.category.toLowerCase() === this.selectedCategory.toLowerCase()
            );
            this.displayedProducts = [...products];
            console.log(this.displayedProducts);
          }
        })
        this.revealProducts();

      },

      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
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
  viewProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]); // Navigate to product details
  }
  ngOnDestroy() {

  }
}
