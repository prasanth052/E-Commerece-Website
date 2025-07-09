import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';

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

  constructor(private route: ActivatedRoute, private productService: ApiService) {}

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


  addToCart(product: any): void {
    // Your cart logic
  }

  buynow(product: any): void {
    // Your buy logic
  }

  loadProduct(product: any): void {
    this.loadProductById(product.id);
  }
}
