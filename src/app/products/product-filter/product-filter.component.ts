import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  searchTerm = '';
  selectedCategory = '';
  categories: string[] = [];
  allProducts: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllproducts().subscribe((data: any[]) => {
      this.allProducts = data;
      this.filteredProducts = data;
      this.categories = [...new Set(data.map((p: any) => p.category))];
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.allProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  selectProduct(product: any): void {
    this.router.navigate(['/products', product.id]);
  }
}
