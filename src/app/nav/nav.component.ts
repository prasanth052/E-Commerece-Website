import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  constructor(private service: ProductsService) { }
  ngOnInit() {
    this.getCategory()

  }
  @ViewChild('sidenav') sidenav!: MatSidenav;
  showSubmenu = false;
  isShowing = true;
  isExpanded = false;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  catg: any[] = new Array()
  Products: any[] = new Array()
  getCategory() {
    //   this.service.getAllproducts().pipe(
    //     map((products: any[]) => [...new Set(products.map(product => product.category))])
    //   ).subscribe(categories => this.catg = categories);
    // // console.log(this.catg); 
    this.service.getAllproducts().subscribe({
      next: (res: any) => {
        this.Products = res
        if (this.Products.length > 0) {
          this.priceRange = [...new Set(this.Products.map((product: any) => product.price))];
        }
      }
    })
  }
  priceRange: any

  seletecedCatg(selectedName: string) {
    this.service.setCategory(selectedName); // Notify the service
  }

  showCategoryMenu = false;
  showFilterMenu = false;
  showPriceMenu = false
  toggleCategoryMenu() {
    this.showCategoryMenu = !this.showCategoryMenu;
  }

  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
  }
  togglePriceMenu() {
    this.showPriceMenu = !this.showPriceMenu;
  }
}
