import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  order: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const orderData = localStorage.getItem('orderDetails'); // Or get from API/service
    this.order = orderData ? JSON.parse(orderData) : this.generateMockOrder();
  }

  generateMockOrder() {
    const today = new Date();
    const deliveryStart = new Date(today);
    deliveryStart.setDate(today.getDate() + 3);
    const deliveryEnd = new Date(today);
    deliveryEnd.setDate(today.getDate() + 5);

    return {
      orderId: 'ESH' + Math.floor(100000000 + Math.random() * 900000000), // Random ID
      deliveryStartDate: this.formatDate(deliveryStart),
      deliveryEndDate: this.formatDate(deliveryEnd),
      name: 'Prasanth K',
      address: '76 Bommanallur',
      city: 'Dharapuram',
      state: 'Tamil Nadu'
    };
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  trackOrder() {
    this.router.navigate(['/track-order'], { queryParams: { id: this.order.orderId } });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
