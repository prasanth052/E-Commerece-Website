import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  hideNavbar = false;
  secondnavbar = false;
  Sidebar = false;
  adminSidebar = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const childRoute = this.getChild(this.route);
        const routeData = childRoute.snapshot.data;
        console.log(routeData['Sidebar']);

        this.hideNavbar = routeData['hideNavbar'] ?? false;
        this.secondnavbar = routeData['secondnavbar'] ?? false;
        this.Sidebar = routeData['Sidebar']
        console.log(this.Sidebar);

        this.adminSidebar = routeData['userRole'] === 'admin';

        // Scroll to top on route change
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }

        // Mark for check in case of OnPush strategy
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void { }

  private getChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  toggleSidenav() {
    // Optional method if you need to trigger sidenav toggle from toolbar icon
  }
}
