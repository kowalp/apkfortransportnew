import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/log-in/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }
  hide = true;

  ngOnInit() {
  }
  onSubmit(form: NgForm): void {
    const newPassword = {
      Email: form.value.Email,
      OldPassword: form.value.OldPassword,
      NewPassword: form.value.NewPassword,
    };
    this.authService.ChangePassword(newPassword)
    .subscribe((data: any) => {
      this.openSnackBar();
    },
    (err: HttpErrorResponse) => {
    });
    form.reset();
  }
  openSnackBar() {
    this.snackBar.open('Dziękujemy!', 'Hasło zostało zmienione!', {
      duration: 2000,
    });
  }
}
