import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('isLogin'); // or use a service
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']); // redirect to login if not authenticated
      return false;
    }
  }
}
