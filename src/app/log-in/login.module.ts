import { SharedModule } from './../shared/utils/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LogInComponent } from './log-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    LogInComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LoginModule { }
