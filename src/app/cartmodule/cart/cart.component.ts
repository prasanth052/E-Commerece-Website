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

  constructor(private cartService:CartService) {}

  ngOnInit(): void {
    // Subscribe to live cart count (for header)
    this.cartService.cartCount$.subscribe((count: number) => {
      this.cartCount = count;
    });

    // Load cart from localStorage
    this.loadCartFromStorage();

    // Subscribe to external updates (e.g. from other pages)
    this.cartService.updateTrigger$.subscribe(() => {
      this.loadCartFromStorage();
    });
  }

  loadCartFromStorage(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = cart;
    this.groupCartItems();
    this.calculateTotals();
  }

  groupCartItems(): void {
    const map = new Map<number, any>();
    this.cart.forEach(item => {
      if (map.has(item.id)) {
        map.get(item.id).quantity += 1;
      } else {
        map.set(item.id, { ...item, quantity: 1 });
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

  removeItem(item: any): void {
    this.groupedCart = this.groupedCart.filter(i => i.id !== item.id);
    this.syncGroupedToCart();
  }

  syncGroupedToCart(): void {
    this.cart = [];
    this.groupedCart.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        this.cart.push({ ...item, quantity: 1 });
      }
    });

    this.cartService.updateCart(this.cart); // Also triggers count update
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalItems = this.groupedCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    this.totalAmount = this.groupedCart.reduce((sum, item) => sum + (item.finalPrice * (item.quantity || 1)), 0);
    this.cartService.setCartCount(this.totalItems); // Sync count in header
  }

  saveForLater(item: any): void {
    alert(`${item.title} saved for later (not implemented)`);
  }
   checkout(product: any): void {
    let login: boolean = JSON.parse(localStorage.getItem('isLogin') || 'true');
    if (login) {
      if (product.stock >= this.totalAmount) {
        const cart = [{ ...product, quantity: this.totalAmount }];
        localStorage.setItem('buyNow', JSON.stringify(cart));
        // this.router.navigate(['/checkout']);
      } else {
        alert('Not enough stock available.');
      }
    } else {
      // this.router.navigate(['/login']);
    }
  }
}

