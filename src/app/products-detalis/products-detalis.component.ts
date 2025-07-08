import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { log } from 'console';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   discountPercentage: number;
//   category: string;
//   rating: number;
//   stock: number;
//   tags?: string[];
//   brand: string;
//   sku: string;
//   weight: string;
//   warrantyInformation: string;
//   shippingInformation: string;
//   availabilityStatus: string;
//   returnPolicy: string;
//   image: string;
//   images?: string[]; // Optional if your product has multiple images
//   quantity?: number;
//   thumbnail?: string[];
//   dimensions?: string[];
//   reviews: string;
// }

@Component({
  selector: 'app-products-detalis',
  templateUrl: './products-detalis.component.html',
  styleUrls: ['./products-detalis.component.scss']
})
export class ProductsDetalisComponent implements OnInit {
  product: any = {}; // or with correct type
  similarProducts: any[] = [];
  mainImage: string | null = null;
  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();
  Math = Math;
  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.getProductDetails(productId);
      }
    });
  }
  descriptionLines: any
  shippingInfoLines: string[] = [];
  returnPolicyLines: string[] = [];
  getProductDetails(productId: string): void {
    this.service.getProductById(+productId).subscribe((data: any) => {
      this.product = data;
      this.descriptionLines = this.product?.description || ''.split('.').map((s: string) => s.trim()).filter((s: any) => s); // remove empty lines
      if (this.product?.shippingInformation) {
        this.shippingInfoLines = this.product.shippingInformation.split('.').map((line: string) => line.trim()).filter(Boolean);
      }
      if (this.product?.returnPolicy) {
        this.returnPolicyLines = this.product.returnPolicy.split('.').map((line: string) => line.trim()).filter(Boolean);
      }
      if (this.product?.returnPolicy) {
        this.returnPolicyLines = this.product.returnPolicy.split('.').map((line: string) => line.trim()).filter(Boolean);
      }
      this.mainImage = data.image;
      this.loadSimilarProducts(data.category);
    });
  }

  loadSimilarProducts(category: string): void {
    this.service.getSimliarCateogries(category).subscribe((data: any) => {
      this.similarProducts = data.products.filter((p: any) => p.id !== this.product.id);
    });

  }

  loadProduct(prod: any): void {
    this.router.navigate(['/product', prod.id]); // updates URL and triggers ngOnInit
  }

  addToCart(product: any): void {
    const login: boolean = JSON.parse(localStorage.getItem('isLogin') || '[]');
    if (login) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProduct = cart.find((item: any) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartItemsSubject.next(cart.length);
      alert(`${product.title} has been added to your cart!`);
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  selectedQuantity: number = 1;
 buynow(product: any): void {
    let login: boolean = JSON.parse(localStorage.getItem('isLogin') || 'true');
    if (login) {
      if (product.stock >= this.selectedQuantity) {
        const cart = [{ ...product, quantity: this.selectedQuantity }];
        localStorage.setItem('buyNow', JSON.stringify(cart));
        this.router.navigate(['/checkout']);
      } else {
        alert('Not enough stock available.');
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  roundRating(rating: number): number {
    return Math.round(rating);
  }

}
