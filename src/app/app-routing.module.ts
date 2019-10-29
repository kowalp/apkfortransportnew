import { EditInvidualComponent } from './calendar/edit-mode/edit-invidual/edit-invidual.component';
import { RaportsComponent } from './calendar/raports/raports.component';
import { MasterGuard } from './log-in/master-guard';
import { EditModeComponent } from './calendar/edit-mode/edit-mode.component';
import { AuthGuard } from './log-in/auth-guard';
import { LogInComponent } from './log-in/log-in.component';
import { NgModule } from '@angular/core';
import { ForLaterComponent } from './main/for-later/for-later.component';
import { ForNowComponent } from './main/for-now/for-now.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { EditFormsComponent } from './calendar/edit-mode/edit-forms/edit-forms.component';
import { ChangePasswordComponent } from './log-in/change-password/change-password.component';
import { RegisterUserComponent } from './main/register-user/register-user.component';
import { PricingComponent } from './main/pricing/pricing.component';
import { NotFoundComponent } from './log-in/not-found/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home' , component: MainComponent, data: {animation: 'Home'}, canActivate: [ AuthGuard ]},
    { path: 'reports' , component: RaportsComponent, data: {animation: 'Raports'}, canActivate: [ AuthGuard ]},
    { path: 'forNow' , component: ForNowComponent, data: {animation: 'ForNow'}, canActivate: [ AuthGuard ]},
    { path: 'forLater' , component: ForLaterComponent, data: {animation: 'ForLater'}, canActivate: [ AuthGuard ]},
    { path: 'calendar' , component: CalendarComponent, data: {animation: 'Calendar'}, canActivate: [ AuthGuard ]},
    { path: 'prices' , component: PricingComponent, data: {animation: 'Calendar'}, canActivate: [ AuthGuard ]},
    { path: 'editHotels' , component: EditModeComponent, data: {animation: 'Raports'}, canActivate: [ MasterGuard ]},
    { path: 'editInviduals' , component: EditInvidualComponent, data: {animation: 'Raports'}, canActivate: [ MasterGuard ]},
    { path: 'passwordChange' , component: ChangePasswordComponent, data: {animation: 'Raports'}},
    { path: 'editForms' , component: EditFormsComponent, data: {animation: 'Raports'}, canActivate: [ MasterGuard ]},
    { path: 'login' , component: LogInComponent, data: {animation: 'login'}},
    { path: 'register' , component: RegisterUserComponent, data: {animation: 'register'}, canActivate: [ MasterGuard ]},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
