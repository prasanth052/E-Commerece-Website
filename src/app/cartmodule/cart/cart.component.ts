import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  groupedCart: any[] = [];
  totalItems = 0;
  totalAmount = 0;
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // live cart count (header)
    this.cartService.cartCount$.subscribe((count: number) => {
      this.cartCount = count;
    });

    this.loadCartFromStorage();

    // when other components call triggerUpdate()
    this.cartService.updateTrigger$.subscribe(() => {
      this.loadCartFromStorage();
    });
  }

  loadCartFromStorage(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = Array.isArray(cart) ? cart : [];
    this.groupCartItems();
    this.calculateTotals();
  }

  // ✅ group by _id, not id
  groupCartItems(): void {
    const map = new Map<string, any>();

    this.cart.forEach(item => {
      if (!item || typeof item !== 'object') return;
      const key = item._id;      // 👈 use _id here
      if (!key) return;

      if (map.has(key)) {
        const existing = map.get(key);
        existing.quantity = (existing.quantity || 0) + (item.quantity || 1);
      } else {
        map.set(key, { ...item, quantity: item.quantity || 1 });
      }
    });

    this.groupedCart = Array.from(map.values());
  }

  increaseQty(item: any): void {
    item.quantity += 1;
    this.syncGroupedToCart();
  }

  decreaseQty(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.syncGroupedToCart();
    }
  }

  // ✅ remove by _id
  removeItem(item: any): void {
    this.groupedCart = this.groupedCart.filter(i => i._id !== item._id);
    this.syncGroupedToCart();
  }

  // 👉 Keep storage and service in sync
  syncGroupedToCart(): void {
    // store grouped structure with quantity
    this.cart = this.groupedCart.map(i => ({ ...i }));

    // CartService.updateCart will save to localStorage and update count
    this.cartService.updateCart(this.cart);
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalItems = this.groupedCart
      .reduce((sum, item) => sum + (item.quantity || 0), 0);

    this.totalAmount = this.groupedCart
      .reduce((sum, item) => sum + (item.finalPrice * (item.quantity || 1)), 0);

    this.cartService.setCartCount(this.totalItems); // keep header in sync
  }

  saveForLater(item: any): void {
    alert(`${item.productName} saved for later (not implemented)`);
  }

  checkout(product: any): void {
    const login: boolean = JSON.parse(localStorage.getItem('isLogin') || 'false');

    // if (!login) {
    //   this.router.navigate(['/login']);
    //   return;
    // }

    // (side note: this condition is odd – you probably meant stock vs totalItems)
    if (product.stock >= this.totalItems) {
      const cart = [{ ...product, quantity: this.totalItems }];
      localStorage.setItem('buyNow', JSON.stringify(cart));
      // this.router.navigate(['/checkout']);
    } else {
      alert('Not enough stock available.');
    }
  }
  isLoading = false;


savedForLater: any[] = [];



moveToCart(item: any) {
  this.groupedCart.push(item);
  this.savedForLater = this.savedForLater.filter(i => i !== item);
}




}
