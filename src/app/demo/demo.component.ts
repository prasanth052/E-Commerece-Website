import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']  // Corrected `styleUrls`
})
export class DemoComponent implements OnInit {

  // sidebar: HTMLElement | null = null;
  // closeBtn: HTMLElement | null = null;
  // searchBtn: HTMLElement | null = null;

  ngOnInit() {
    // this.sidebar = document.querySelector(".sidebar");
    // this.closeBtn = document.querySelector("#btn");
    // this.searchBtn = document.querySelector(".bx-search");

    // // Ensure elements exist before adding event listeners
    // if (this.closeBtn) {
    //   this.closeBtn.addEventListener("click", () => {
    //     this.toggleSidebar();
    //   });
    // }

    // if (this.searchBtn) {
    //   this.searchBtn.addEventListener("click", () => {
    //     this.toggleSidebar();
    //   });
    // }
  }

  // toggleSidebar() {
  //   if (this.sidebar) {
  //     this.sidebar.classList.toggle("open");
  //     this.menuBtnChange();
  //   }
  // }

  // menuBtnChange() {
  //   if (this.sidebar && this.closeBtn) {
  //     if (this.sidebar.classList.contains("open")) {
  //       this.closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  //     } else {
  //       this.closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  //     }
  //   }
  // }
}
