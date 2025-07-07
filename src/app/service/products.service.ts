import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private categorySource = new BehaviorSubject<string>(''); // Holds the selected category
  selectedCategory$ = this.categorySource.asObservable();

  private _originalProducts: any[] = [];
  private filteredProductsSubject = new BehaviorSubject<any[]>([]);
  filteredProducts$ = this.filteredProductsSubject.asObservable();

  constructor(private http: HttpClient) { }
  getAllproducts(): Observable<any[]> {
    return this.http.get<any[]>('https://dummyjson.com/products')
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/${id}`);
  }
  getLimitProducts(limit: number): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products?limit=' + limit)
  }
  getShortListProducts(sortlist: string): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products?sort=' + sortlist)
  }
  getAllCategories() {
    return this.http.get('https://fakestoreapi.com/products/categories')
  }
  getSimliarCateogries(jewelery: string): Observable<any> {
    return this.http.get(`https:///dummyjson.com/products/category/${jewelery}`)
  }


  setCategory(category: string) {
    sessionStorage.setItem('Category', category); // Update sessionStorage
    this.categorySource.next(category);          // Notify subscribers
  }
  setProducts(products: any[]) {
    this._originalProducts = products;
    this.filteredProductsSubject.next(products);
  }

  applyFilter(discounts: number[], priceRanges: { min: number, max: number }[]) {
    let filtered = this._originalProducts;
    console.log(discounts.length);
    
    if (discounts.length) {
      filtered = filtered.filter(product =>
        discounts.some(d => product.discountPercentage >= d)
      );
    }

    if (priceRanges.length) {
      filtered = filtered.filter(product =>
        priceRanges.some(range =>
          product.price >= range.min && product.price <= range.max
        )
      );
    }

    this.filteredProductsSubject.next(filtered);
  }

  Search(search: string) {
    console.log(search,'search');
    
    let filtered = this._originalProducts;

    if (search && search.length >= 4) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      console.log(filtered,'filtered');
      
    }
    this.filteredProductsSubject.next(filtered); // ✅ Correct way to emit updated products
  }


}
