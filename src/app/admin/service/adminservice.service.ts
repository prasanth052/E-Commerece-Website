import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http:HttpClient) { }

  updateProduct(updateData :any){
       return this.http.post<any>('https://erpapi-bgyq.onrender.com/api/products/updateproduct',updateData)
  }
  CategorySpec(category:any):Observable<any>{
    return this.http.get<any>('https://erpapi-bgyq.onrender.com/api/products/productfilterbyCatg?category='+category)
  }
}
