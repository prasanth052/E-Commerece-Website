import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss'
})
export class CustomSnackbarComponent    {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { title: string; message: string },
    private snackBarRef: MatSnackBarRef<CustomSnackbarComponent>
  ) {}

  close() {
    this.snackBarRef.dismiss();
  }
}


