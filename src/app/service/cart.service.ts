import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.loadCart());
  cartItems$ = this.cartItems.asObservable();

private loadCart(): any[] {
  if (typeof window !== 'undefined' && localStorage) {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  return [];
}


  updateCart(items: any[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems.next(items);
  }
}
