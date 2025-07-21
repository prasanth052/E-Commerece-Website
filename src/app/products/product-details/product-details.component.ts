import { ApiService } from './../../core/api.service';
import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CustomSnackbarComponent } from '../../shared/custom-snackbar/custom-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../core/cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct: any;
  similarProducts: any[] = [];
  selectedQuantity = 1;
  mainImage: string | null = null;
  Math = Math
  shippingInfoLines = ['Free delivery within 3-5 days', 'Cash on delivery available'];
  returnPolicyLines = ['7-day return policy', 'Refund on damaged product'];
  constructor(public SharedService: SharedService, public router: Router, private snackBar: MatSnackBar,
    private cartService: CartService, private ApiService: ApiService) { }
  private productSubscription!: Subscription;

  ngOnInit(): void {
    const cachedProduct = sessionStorage.getItem('selectedProduct');
    if (cachedProduct) {
      this.selectedProduct = JSON.parse(cachedProduct);
      console.log(this.selectedProduct.brand);
      
      this.loadSimilarProducts(this.selectedProduct.brand);
    }

    this.productSubscription = this.SharedService.selectedProduct$.subscribe((product) => {
      if (product) {
        this.selectedProduct = product;
        this.loadSimilarProducts(product.brand);
      }
    });
  }

  loadSimilarProducts(brand: string): void {
    this.ApiService.getAllproducts().subscribe((products: any[]) => {
      this.similarProducts = products.filter(
        (p) => p.brand === brand && p._id !== this.selectedProduct._id
      );
      console.log('Similar Products:', this.similarProducts);
    });
  }

  navigateToProductDetails(product: any): void {
    this.SharedService.setSelectedProduct(product);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products/product-details']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();
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
      this.cartService.triggerUpdate();
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          title: product.title,
          message: 'added to cart!',
          type: 'success' // or 'error', 'warning'
        },
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-panel'] // Optional class
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  buynow(product: any): void {
    // Your buy logic
  }
//  addreess
enteredPincode = '';
pincodeMessage = '';
productReviews = [
  { name: 'Arun K.', comment: 'Very comfortable and lightweight. Good for long runs.' },
  { name: 'Priya S.', comment: 'Stylish and fits perfectly. Worth the price.' }
];

checkDelivery() {
  if (this.enteredPincode === '600001') {
    this.pincodeMessage = 'Delivery available to your location.';
  } else {
    this.pincodeMessage = 'Sorry, not deliverable to this location.';
  }
}



}
