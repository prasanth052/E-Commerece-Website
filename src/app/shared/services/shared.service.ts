import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private categorySource = new BehaviorSubject<string>(''); // Holds the selected category
  selectedCategory$ = this.categorySource.asObservable();

  private _originalProducts: any[] = [];
  private filteredProductsSubject = new BehaviorSubject<any[]>([]);
  filteredProducts$ = this.filteredProductsSubject.asObservable();


  setCategory(category: string) {
    sessionStorage.setItem('Category', category); // Update sessionStorage
    this.categorySource.next(category); // Notify subscribers
  }
  setProducts(products: any[]) {
    this._originalProducts = products;
    this.filteredProductsSubject.next(products);
  }

  applyFilter(
    discounts: number[],
    priceRanges: { min: number; max: number }[]
  ) {
    let filtered = this._originalProducts;
    console.log(discounts.length);

    if (discounts.length) {
      filtered = filtered.filter((product) =>
        discounts.some((d) => product.discount >= d)
      );
    }

    if (priceRanges.length) {
      filtered = filtered.filter((product) =>
        priceRanges.some(
          (range) => product.finalPrice >= range.min && product.finalPrice <= range.max
        )
      );
    }

    this.filteredProductsSubject.next(filtered);
  }

  Search(search: string) {
    console.log(search, 'search');

    let filtered = this._originalProducts;

    if (search && search.length >= 4) {
      filtered = filtered.filter(
        (product) =>
          product.title?.toLowerCase().includes(search.toLowerCase()) ||
          false ||
          product.brand?.toLowerCase().includes(search.toLowerCase()) ||
          false ||
          product.category?.toLowerCase().includes(search.toLowerCase()) ||
          false
      );

      console.log(filtered, 'filtered');
    }
    this.filteredProductsSubject.next(filtered); // ✅ Correct way to emit updated products
  }

  private selectedProductSubject = new BehaviorSubject<any | null>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();
  setSelectedProduct(product: any) {
      sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    this.selectedProductSubject.next(product);
  }


}
