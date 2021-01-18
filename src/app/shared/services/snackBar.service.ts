import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(data: string) {
    this.snackBar.open('Dziękujemy!', data, {
      duration: 2000,
    });
  }
}
