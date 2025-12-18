import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<any[]>(this.loadCart());
  cartItems$ = this.cartItems.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(this.calculateInitialCount());
  cartCount$ = this.cartCountSubject.asObservable();

  private updateTrigger = new BehaviorSubject<void>(undefined);
  updateTrigger$ = this.updateTrigger.asObservable();

  constructor() {}

  // -------- storage --------
  private loadCart(): any[] {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem('cart');
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  private saveCart(items: any[]): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }

  // -------- key helper (VERY IMPORTANT) --------
  private getProductKey(item: any): string | null {
    if (!item || typeof item !== 'object') return null;
    if (item._id) return String(item._id);      // main unique key
    if (item.id) return String(item.id);        // fallback if you ever use `id`
    return null;                                // means: cannot group -> treat as new
  }

  // -------- count helpers --------
  private calculateCountFromItems(cart: any[]): number {
    if (!Array.isArray(cart)) return 0;

    return cart.reduce((sum, item: any) => sum + (item.quantity || 0), 0);
  }

  public calculateInitialCount(): number {
    const cart = this.loadCart();
    return this.calculateCountFromItems(cart);
  }

  // -------- public API --------
  updateCart(items: any[]): void {
    const safeItems = (Array.isArray(items) ? items : []).filter(
      (it: any) => it && typeof it === 'object'
    );

    this.saveCart(safeItems);
    this.cartItems.next(safeItems);

    const newCount = this.calculateCountFromItems(safeItems);
    this.cartCountSubject.next(newCount);
  }

  // ✅ This will add new products AND update existing ones
  addToCart(product: any): void {
    const items = [...this.cartItems.value];

    const key = this.getProductKey(product);

    if (key === null) {
      // no key? never try to "merge", just add as separate item
      items.push({ ...product, quantity: product.quantity ?? 1 });
    } else {
      const index = items.findIndex(p => this.getProductKey(p) === key);

      if (index >= 0) {
        const existing = items[index];
        const currentQty = existing.quantity || 0;
        items[index] = { ...existing, quantity: currentQty + 1 };
      } else {
        items.push({ ...product, quantity: product.quantity ?? 1 });
      }
    }

    console.log('Cart items after addToCart:', items);
    this.updateCart(items);
  }

  setCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  getCartCount(): number {
    return this.cartCountSubject.value;
  }

  triggerUpdate(): void {
    this.updateTrigger.next();
  }
}
