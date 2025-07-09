import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 private cartItems = new BehaviorSubject<any[]>(this.loadCart());
  cartItems$ = this.cartItems.asObservable();
  private cartCountSubject = new BehaviorSubject<number>(this.calculateInitialCount());

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
    this.cartCountSubject.next(count);
  }
  getCartCount() {
    return this.cartCountSubject.value
  }
  triggerUpdate() {

    this.updateTrigger.next(); // Notifies subscribers
  }

  public calculateInitialCount(): number {
    const cart = this.loadCart();
    const map = new Map<number, any>();
    cart.forEach(item => {
      if (map.has(item.id)) {
        map.get(item.id).quantity += 1;
      } else {
        map.set(item.id, { ...item, quantity: 1 });
      }
    });
    const grouped = Array.from(map.values());
    return grouped.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }

}

