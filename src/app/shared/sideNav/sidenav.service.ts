import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenavOpen = new BehaviorSubject<boolean>(true);
  sidenavOpen$ = this.sidenavOpen.asObservable();

  toggle() {
    this.sidenavOpen.next(!this.sidenavOpen.value);
  }

  open() {
    this.sidenavOpen.next(true);
  }

  close() {
    this.sidenavOpen.next(false);
  }
}
