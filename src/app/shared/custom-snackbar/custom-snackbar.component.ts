import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss'
})
export class CustomSnackbarComponent  implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: any,
    @Inject(MAT_SNACK_BAR_DATA) public data: { title: string; message: string; type: 'success' | 'error' | 'warning' }) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // safe DOM code
    }
  }
}
