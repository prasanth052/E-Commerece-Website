import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] // ✅ corrected `styleUrl` → `styleUrls`
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  totalItems = 0;
  totalAmount = 0;

  constructor(private cartService: CartService) { }

ngOnInit(): void {
  // Always update cart data on init — even if trigger was not called
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  this.cart = cart;
  this.groupCartItems();
  this.calculateTotals();

  // Now listen for updates
  this.cartService.updateTrigger$.subscribe(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = cart;
    this.groupCartItems();
    this.calculateTotals();
  });
}

  increaseQty(item: any): void {
    item.quantity += 1;
    this.updateCartFromGrouped();
  }

  decreaseQty(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateCartFromGrouped();
    }
  }

  updateCartFromGrouped(): void {
    // Flatten groupedCart into cart array (same product ID repeated based on quantity)
    this.cart = [];

    this.groupedCart.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        this.cart.push({ ...item, quantity: 1 });
      }
    });

    this.cartService.updateCart(this.cart);
    this.calculateTotals();
  }

  removeItem(item: any): void {
    this.cart = this.cart.filter(i => i.id !== item.id);
    this.cartService.updateCart(this.cart);
    this.groupCartItems();
    this.calculateTotals();
  }

  saveForLater(item: any): void {
    alert(`${item.title} saved for later (not implemented)`);
  }
  groupedCart: any[] = [];
  public groupCartItems() {
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

  public calculateTotals() {
    this.totalItems = this.groupedCart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    this.totalAmount = this.groupedCart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    this.cartService.setCartCount(this.totalItems);
  }
}
