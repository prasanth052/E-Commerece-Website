import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private categorySource = new BehaviorSubject<string>(''); // Holds the selected category
  selectedCategory$ = this.categorySource.asObservable(); 
  constructor(private http: HttpClient) { }
  getAllproducts(){
    return this.http.get('https://fakestoreapi.com/products')  
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`https://fakestoreapi.com/products/${id}`);
  }
  getLimitProducts(limit:number): Observable<any>{
    return this.http.get('https://fakestoreapi.com/products?limit='+limit)
  }
  getShortListProducts(sortlist:string): Observable<any>{
    return this.http.get('https://fakestoreapi.com/products?sort='+sortlist)
  }
  getAllCategories() {
    return this.http.get('https://fakestoreapi.com/products/categories')
  }
  getSimliarCateogries(jewelery: string): Observable<any>{
    return this.http.get(`https://fakestoreapi.com/products/category/${jewelery}`)
  }


  setCategory(category: string) {
    sessionStorage.setItem('Category', category); // Update sessionStorage
    this.categorySource.next(category);          // Notify subscribers
  }
}
