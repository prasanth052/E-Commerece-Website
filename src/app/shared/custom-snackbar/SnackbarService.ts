import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './custom-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  openSnackBar(title: string, message: string, type: string = 'success') {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: title,
        title: 'Fun'
      },
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['dark-snackbar']
    });

  }
}
