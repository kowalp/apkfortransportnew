import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit(form: NgForm): void {
    const newPassword = {
      Email: form.value.Email,
      OldPassword: form.value.OldPassword,
      NewPassword: form.value.NewPassword,
    };
    this.authService.ChangePassword(newPassword);
    form.reset();
  }
}
