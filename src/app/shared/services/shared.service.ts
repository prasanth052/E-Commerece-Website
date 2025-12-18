import { BehaviorSubject } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isBrowser: boolean;

  private _originalProducts: any[] = [];

  private filteredProductsSubject = new BehaviorSubject<any[]>([]);
  filteredProducts$ = this.filteredProductsSubject.asObservable();

  private categorySource = new BehaviorSubject<string>('');
  selectedCategory$ = this.categorySource.asObservable();

  private selectedProductSubject = new BehaviorSubject<any | null>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();

  // Filter states
  private activeSearch: string = '';
  private activeDiscounts: number[] = [];
  private activePriceRanges: { min: number; max: number }[] = [];
  private activeSort: { field: string; direction: 'asc' | 'desc' } | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const saved = sessionStorage.getItem('products');
      if (saved) {
        this._originalProducts = JSON.parse(saved);
        this.filteredProductsSubject.next(this._originalProducts);
      }

      const savedCategory = sessionStorage.getItem('Category') || '';
      this.categorySource.next(savedCategory);

      const selectedProduct = sessionStorage.getItem('selectedProduct');
      if (selectedProduct) {
        this.selectedProductSubject.next(JSON.parse(selectedProduct));
      }
    }
  }

  setProducts(products: any[]) {
    this._originalProducts = products;
    if (this.isBrowser) {
      sessionStorage.setItem('products', JSON.stringify(products));
    }
    this.applyAllFilters();
  }

  setCategory(category: string) {
    if (this.isBrowser) {
      sessionStorage.setItem('Category', category);
    }
    this.categorySource.next(category);
    this.applyAllFilters();
  }

  setSelectedProduct(product: any) {
    if (this.isBrowser) {
      sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    }
    this.selectedProductSubject.next(product);
  }

  applyFilter(discounts: number[], priceRanges: { min: number; max: number }[]) {
    this.activeDiscounts = discounts;
    this.activePriceRanges = priceRanges;
    this.applyAllFilters();
  }

  Search(search: string) {
    this.activeSearch = search;
    this.applyAllFilters();
  }

  applySort(field: string, direction: 'asc' | 'desc') {
    this.activeSort = { field, direction };
    this.applyAllFilters();
  }

  clearAllFilters() {
    this.activeSearch = '';
    this.activeDiscounts = [];
    this.activePriceRanges = [];
    this.activeSort = null;
    this.applyAllFilters();
  }

  private applyAllFilters() {
    let filtered = [...this._originalProducts];

    const selectedCategory = this.categorySource.value;
    if (selectedCategory) {
      filtered = filtered.filter(
        product => product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (this.activeDiscounts.length) {
      filtered = filtered.filter(product =>
        this.activeDiscounts.some(d => product.discount >= d)
      );
    }

    if (this.activePriceRanges.length) {
      filtered = filtered.filter(product =>
        this.activePriceRanges.some(
          range =>
            product.finalPrice >= range.min && product.finalPrice <= range.max
        )
      );
    }

    if (this.activeSearch && this.activeSearch.length >= 3) {
      const keyword = this.activeSearch.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.title?.toLowerCase().includes(keyword) ||
          product.brand?.toLowerCase().includes(keyword) ||
          product.category?.toLowerCase().includes(keyword)
      );
    }

    if (this.activeSort) {
      const { field, direction } = this.activeSort;
      filtered.sort((a, b) => {
        const valA = a[field];
        const valB = b[field];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return direction === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else {
          return direction === 'asc' ? valA - valB : valB - valA;
        }
      });
    }

    this.filteredProductsSubject.next(filtered);
  }



  // SideNav Close And Open
   private sidenavOpenSubject = new BehaviorSubject<boolean>(false); // start closed
  sidenavOpen$ = this.sidenavOpenSubject.asObservable();

  toggle(): void {
    const current = this.sidenavOpenSubject.value;
    this.sidenavOpenSubject.next(!current);
    console.log('Service toggle ->', !current);
  }

  open(): void {
    this.sidenavOpenSubject.next(true);
  }

  close(): void {
    this.sidenavOpenSubject.next(false);
  }
}
