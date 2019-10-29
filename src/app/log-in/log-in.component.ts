import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  isLoginError = false;
  constructor(private router: Router, private authService: AuthService) { }
  email: string;
  password: string;

  ngOnInit() {
  }
  onSubmit(email, password): void {
    this.authService.LogIn(email, password)
    .subscribe((data: any) => {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      if (localStorage.getItem('role') === 'driver') {
        this.router.navigate(['../calendar']);
      } else {
          this.router.navigate(['../Home']);
      }
      if (data.token != null) {
        localStorage.setItem('email', email);
      }
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }
}
