import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart: any[] = [];
  totalItems = 0;
  totalAmount = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cart = items;
      // console.log( this.cart);

      this.calculateTotals();
    });
  }

  updateCart() {
    this.cartService.updateCart(this.cart);
    this.calculateTotals();
  }

  removeItem(item: any) {
    this.cart = this.cart.filter(i => i.id !== item.id);
    this.cartService.updateCart(this.cart);
    this.calculateTotals();
  }

  saveForLater(item: any) {
    alert(`${item.title} saved for later (not implemented)`);
  }

  calculateTotals() {
    this.totalItems = this.cart.reduce((sum: number, item: any) => sum + Number(item.quantity), 0);
    // console.log(this.totalItems);

    this.totalAmount = this.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  }

}
