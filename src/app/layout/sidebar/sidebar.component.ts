import { SharedService } from './../../shared/services/shared.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fail } from 'assert';
import { SidenavService } from '../../shared/sideNav/sidenav.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('sidenavState', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @Input() admin: boolean = false;
  hideNavbar = false;
  public secondnavbar = false;
  public Sidebar:any
  hidesidebar = true;
  sidenavClass = 'lg';
  isSidenavOpen = true;
  constructor(
    private SharedService: SharedService,
    private sidenavService: SidenavService, private router: Router
  ) { }


  ngOnInit(): void {
     if (this.admin === false) {
    return; // Skip init logic
  }
    this.sidenavService.sidenavOpen$.subscribe((isOpen) => {
      this.isSidenavOpen = isOpen;
      console.log('Sidebar is now', isOpen ? 'open' : 'closed');
    });

  }
  activeSubmenu: string | null = null;

  toggleSubmenu(menu: string) {
    this.activeSubmenu = this.activeSubmenu === menu ? null : menu;
  }
  discountOptions = [10, 25, 50, 70];
  selectedDiscounts: number[] = [];
  toggleDiscount(value: number) {
    const index = this.selectedDiscounts.indexOf(value);
    if (index > -1) {
      this.selectedDiscounts.splice(index, 1); // remove if already selected
    } else {
      this.selectedDiscounts.push(value); // add if not selected
    }
    this.SharedService.applyFilter(this.selectedDiscounts, this.selectedPrice);

    console.log('Selected Discounts:', this.selectedDiscounts);
  }
  selectedPrice: any[] = [];

  togglePrice(range: { min: number; max: number }) {
    const index = this.selectedPrice.findIndex(
      (p) => p.min === range.min && p.max === range.max
    );
    if (index > -1) {
      this.selectedPrice.splice(index, 1);
    } else {
      this.selectedPrice.push(range);
    }

    this.SharedService.applyFilter(this.selectedDiscounts, this.selectedPrice);
    console.log('Selected price:', this.selectedPrice);
  }
  priceOptions = [
    { min: 0, max: 499 },
    { min: 500, max: 999 },
    { min: 1000, max: 1999 },
    { min: 2000, max: Infinity },
  ];
  getPriceLabel(index: number): string {
    const range = this.priceOptions[index];
    if (range.max === Infinity) {
      return `₹${range.min} & Above`;
    } else if (range.min === 0) {
      return `Under ₹${range.max}`;
    } else {
      return `₹${range.min} – ₹${range.max}`;
    }
  }
}
