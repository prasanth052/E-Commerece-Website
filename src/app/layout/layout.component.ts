import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  sidenavbar = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // 👈 Add this
  ) {}

  ngOnInit(): void {
    // ✅ Check once after load
    setTimeout(() => {
      const activeRoute = this.getDeepestChild(this.route);
      this.updateFlagsFromRoute(activeRoute);
      this.cdr.detectChanges(); // 👈 Ensure UI reflects updates
    });

    // ✅ Also handle on route change
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.getDeepestChild(this.route);
        this.updateFlagsFromRoute(currentRoute);
        this.cdr.detectChanges(); // 👈 Ensure UI reflects updates
      });
  }

  updateFlagsFromRoute(route: ActivatedRoute) {
    console.log(route.snapshot.data);
    this.hideNavbar = route.snapshot.data['hideNavbar'] ?? false;
    this.secondnavbar = route.snapshot.data['secondnavbar'] ?? false;
  }

  getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
