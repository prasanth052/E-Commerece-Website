// src/app/components/products-detalis/products-detalis.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Component({
  selector: 'app-products-detalis',
  templateUrl: './products-detalis.component.html',
  styleUrls: ['./products-detalis.component.scss']
})
export class ProductsDetalisComponent implements OnInit {
  product: Product | null = null;
  similarProducts: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private service: ProductsService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductDetails(productId);
    }
  }

  getProductDetails(productId: string): void {
    this.service.getProductById(+productId).subscribe((data) => {
      this.product = data;
      if (this.product) {
        this.loadSimilarProducts(this.product.category);
      }
    });
  }

  loadSimilarProducts(category: string): void {
    this.service.getSimliarCateogries(category).subscribe((data) => {    
      this.similarProducts = data.filter((p: Product) => p.id !== this.product?.id);
      console.log( this.similarProducts);
      
    });
  }

  addToCart(product: Product): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((item: Product) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItemsSubject.next(cart.length);
    alert(`${product.title} has been added to your cart!`);
  }
  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
