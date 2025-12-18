import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http:HttpClient) { }

  updateProduct(updateData :any){
       return this.http.post<any>('https://erpapi-bgyq.onrender.com/api/products/updateproduct',updateData)
  }
}
