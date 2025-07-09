import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
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
 
 

 
 
 }
 