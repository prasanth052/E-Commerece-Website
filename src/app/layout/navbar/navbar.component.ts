import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { SidenavService } from '../../shared/sideNav/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  hideNavbar = false;
  secondnavbar = false;
  cartCount = 0;
  constructor(
    private SharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private sidenavService: SidenavService
  ) { }
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.getDeepestRoute(this.route.root);
        this.hideNavbar = currentRoute.snapshot.data['hideNavbar'] || false;
        this.secondnavbar = currentRoute.snapshot.data['secondnavbar'] || false;
      });
  }
  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
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
