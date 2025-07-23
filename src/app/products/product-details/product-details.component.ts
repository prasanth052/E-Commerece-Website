import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ApiService } from './../../core/api.service';
import { SharedService } from './../../shared/services/shared.service';
import { CartService } from '../../core/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../shared/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct: any = null;
  similarProducts: any[] = [];
  leftSpecs: any[] = [];
  rightSpecs: any[] = [];
  SpecficationLength = 0;
  Math = Math;

  private productSubscription!: Subscription;
  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();

  enteredPincode = '';
  pincodeMessage = '';
  productReviews = [
    { name: 'Arun K.', comment: 'Very comfortable and lightweight.' },
    { name: 'Priya S.', comment: 'Stylish and fits perfectly.' },
  ];

  constructor(
    private api: ApiService,
    private shared: SharedService,
    private cart: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cached = sessionStorage.getItem('selectedProduct');
    if (cached) this.setProduct(JSON.parse(cached));

    this.productSubscription = this.shared.selectedProduct$.subscribe(
      (product) => {
        if (product) {
          sessionStorage.setItem('selectedProduct', JSON.stringify(product));
          this.setProduct(product);
        }
      }
    );
  }

  private setProduct(product: any) {
    this.selectedProduct = {
      ...product,
      finalPrice:
        product.basePrice - (product.basePrice * product.discount) / 100,
      stockStatus:
        product.stock === 0
          ? 'Out of Stock'
          : product.stock > 10
          ? 'In Stock'
          : 'Low Stock',
    };

    this.loadSimilarProducts(product.brand);
    this.setSpecs(
      product?.mobileSpecs?.[0] ||
        product?.clothesSpecs?.[0] ||
        product?.shoesSpecs?.[0] ||
        product?.laptopSpecs?.[0] ||
        {}
    );
  }

private setSpecs(specs: any) {
  let entries = Object.entries(specs);
  const [firstKey, firstValue] = entries[0];
  const hiddenKeyPatterns = [firstKey.toLowerCase()];
  const hiddenValuePatterns = [String(firstValue).toLowerCase()];

  // Filter entries based on key or value match
  entries = entries.filter(([key, value]) => {
    const keyLower = key.toLowerCase();
    const valueLower = String(value).toLowerCase();

    const shouldHide =
      hiddenKeyPatterns.some((pattern) => keyLower.includes(pattern)) ||
      hiddenValuePatterns.some((pattern) => valueLower.includes(pattern));

    return !shouldHide;
  });

  this.SpecficationLength = entries.length;

  if (this.SpecficationLength > 6) {
    const mid = Math.ceil(entries.length / 2);
    this.leftSpecs = entries.slice(0, mid).map(([key, value]) => ({ key, value }));
    this.rightSpecs = entries.slice(mid).map(([key, value]) => ({ key, value }));
  } else {
    this.leftSpecs = [];
    this.rightSpecs = entries.map(([key, value]) => ({ key, value }));
  }
}


  private loadSimilarProducts(brand: string): void {
    this.api.getAllproducts().subscribe((products) => {
      this.similarProducts = products.filter(
        (p) => p.brand === brand && p._id !== this.selectedProduct?._id
      );
    });
  }

  formatValue(val: any): string {
    return val === true ? 'Yes' : val === false ? 'No' : val;
  }

  navigateToProductDetails(product: any): void {
    this.shared.setSelectedProduct(product);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products/product-details']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  addToCart(product: any) {
    if (!JSON.parse(localStorage.getItem('isLogin') || 'false')) {
      this.router.navigate(['/login']);
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);
    existing ? existing.quantity++ : cart.push({ ...product, quantity: 1 });

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItemsSubject.next(cart.length);
    this.cart.triggerUpdate();

    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        title: product.title,
        message: 'added to cart!',
        type: 'success',
      },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-panel'],
    });
  }

  checkDelivery(): void {
    this.pincodeMessage =
      this.enteredPincode === '600001'
        ? 'Delivery available to your location.'
        : 'Sorry, not deliverable to this location.';
  }

  buynow(product: any): void {
    // Buy now logic (optional)
  }
}
