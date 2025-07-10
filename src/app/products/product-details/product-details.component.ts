import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { BehaviorSubject } from 'rxjs';
import { CustomSnackbarComponent } from '../../shared/custom-snackbar/custom-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../core/cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  similarProducts: any[] = [];
  selectedQuantity = 1;
  mainImage: string | null = null;
  Math=Math
  shippingInfoLines = ['Free delivery within 3-5 days', 'Cash on delivery available'];
  returnPolicyLines = ['7-day return policy', 'Refund on damaged product'];

  constructor(private route: ActivatedRoute, private productService: ApiService,
    private snackBar:MatSnackBar,private cartService:CartService,private router:Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProductById(id);
    }
  }

  loadProductById(id: string): void {
    this.productService.getProductById(+id).subscribe(data => {
      this.product = data;
      this.loadSimilarProducts(data.category);
    });
  }
loadSimilarProducts(category: string): void {
  this.productService.getSimliarCateogries(category).subscribe((data: any) => {
    console.log('Returned data:', data);

    // Ensure it's an array before calling filter
    if (Array.isArray(data)) {
      this.similarProducts = data.filter((p: any) => p.id !== this.product.id);
    } else if (Array.isArray(data?.products)) {
      this.similarProducts = data.products.filter((p: any) => p.id !== this.product.id);
    } else {
      console.warn('Expected an array but got:', data);
      this.similarProducts = [];
    }
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

  loadProduct(product: any): void {
    this.loadProductById(product.id);
  }
}
