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
    this.getCategories()
  }
  @ViewChild('sidenav') sidenav!: MatSidenav;
  showSubmenu = false;
  isShowing = true;
  isExpanded = false;

  showCategoryMenu = false;
  showFilterMenu = false;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    catg:any[]=new Array()
  getCategories() {
    this.service.getAllCategories().subscribe({
      next: (res: any) => {
        this.catg = res.map((data: any) => ({ name: data }));
        console.log(this.catg);
      }
    })
  }
  seletecedCatg(selectedName: string) {
    this.service.setCategory(selectedName); // Notify the service
    console.log('Selected Category:', selectedName);
  }
  toggleCategoryMenu() {
    this.showCategoryMenu = !this.showCategoryMenu;
  }

  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
  }
}
