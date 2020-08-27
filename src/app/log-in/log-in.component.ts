import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  isLoginError: boolean = false;
  email: string;
  password: string;
  registerForm: FormGroup;
  loginForm: FormGroup;
  registerFormActive: boolean = false;
  loginFormActive: boolean = true;
  userRoles: Array<object> = [{ key: 'Driver', value: 'driver' }, { key: 'Hotel', value: 'hotel' }];
  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForms();
  }

  onLoginSubmit(): void {
    this.authService.LogIn(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((data: any) => {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        if (data.role === 'driver') {
          this.router.navigate(['../calendar']);
        } else {
          this.router.navigate(['../main']);
        }
        if (data.token !== null) {
          localStorage.setItem('email', this.loginForm.value.email);
        }
      },
        () => {
          this.isLoginError = true;
        });
  }
  onRegisterSubmit(): void {
    this.authService.Register(this.prepareDataFormatForRegister(this.registerForm.value))
    this.registerForm.reset();
  }

  changeToRegister(): void {
    this.registerFormActive = true;
    this.loginFormActive = false;
  }

  changeToLogin(): void {
    this.registerFormActive = false;
    this.loginFormActive = true;
  }

  changeValue(result: string): void {
    this.registerForm.patchValue({roleR: result});
  }

  private prepareDataFormatForRegister(data: any) {
    return {
      Name: data.emailR,
      Email: data.emailR,
      Password: data.passwordR,
      Role: data.roleR.value,
    }
  }

  private createForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      emailR: ['', [Validators.required, Validators.email]],
      roleR: ['', Validators.required],
      passwordR: ['', Validators.required]
    });
  }
}
