import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.loadCart());
  cartItems$ = this.cartItems.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0)
  cartCount$ = this.cartCountSubject.asObservable()

   private updateTrigger = new BehaviorSubject<void>(undefined);
  updateTrigger$ = this.updateTrigger.asObservable();
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
  setCartCount(count: number) {
    this.cartCountSubject.next(count)
  }
  getCartCount() {
    return this.cartCountSubject.value
  }
    triggerUpdate() {
    this.updateTrigger.next(); // Notifies subscribers
  }
}
