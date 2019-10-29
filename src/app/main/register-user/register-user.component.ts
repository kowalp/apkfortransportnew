import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/log-in/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  email = new FormControl('emailValidation', [Validators.required, Validators.email, Validators.minLength(6)]);
  hide = true;
  isLoginError = false;
  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm): void {
    const Register = {
      Name: form.value.Name.replace(/ /g, ''),
      Email: form.value.Email,
      Password: form.value.Password,
      Role: form.value.Role,
    };
    this.authService.Register(Register)
    .subscribe((data: any) => {
      this.openSnackBar();
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
      alert(err);
    });
    form.reset();
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  openSnackBar() {
    this.snackBar.open('Dziękujemy!', 'Zostałeś zarejestrowany', {
      duration: 2000,
    });
  }
}
