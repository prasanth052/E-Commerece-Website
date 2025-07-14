import { SharedCartService } from './../../shared/services/shared-cart.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from './../../shared/services/shared.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';
import { SidenavService } from '../../shared/sideNav/sidenav.service';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
     @Input() admin: boolean = false;

  hideNavbar = false;
  secondnavbar = false;
  cartCount = 0;
  constructor(
    private SharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private sidenavService: SidenavService,
    private cartService: CartService,
    private SharedCartService: SharedCartService
  ) {}
  ngOnInit() {
    this.SharedCartService.setCartCount(
      this.cartService.calculateInitialCount()
    );
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const childRoute = this.getDeepestChild(this.route);
        this.hideNavbar = childRoute.snapshot.data['hideNavbar'] ?? false;
        this.secondnavbar = childRoute.snapshot.data['secondnavbar'] || false;
      });
  }
  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
  searchValue: string = '';
  searchEvent(e: any) {
    this.searchValue = e.target.value;
    this.SharedService.Search(this.searchValue);
  }
  Searchbtn() {
    this.SharedService.Search(this.searchValue);
  }
  isSidenavOpen: boolean = true;
  toggleSidenav() {
    this.sidenavService.toggle();
  }
  
}
