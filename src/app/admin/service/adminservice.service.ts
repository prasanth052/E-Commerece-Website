import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http:HttpClient) { }

  updateProduct(updateData :any){
       return this.http.post<any>('http://localhost:5050/api/products/updateproduct',updateData)
  }
}
