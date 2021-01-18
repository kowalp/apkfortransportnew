import { ChangePasswordComponent } from './change-password/change-password.component';
import { LogInComponent } from './log-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
    pathMatch: 'full',
  },
  {
    children: [
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
