import { PricingComponent } from './main/pricing/pricing.component';
import { EditInvidualComponent } from './calendar/edit-mode/edit-invidual/edit-invidual.component';
import { SafePipe } from './calendar/raports/safe.pipe';
import { CalendarService } from './calendar/calendar.service';
import { AuthGuard } from './log-in/auth-guard';
import { AuthService } from './log-in/auth.service';
import { ForLaterComponent } from './main/for-later/for-later.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ForNowComponent } from './main/for-now/for-now.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LogInComponent } from './log-in/log-in.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { EditModeComponent } from './calendar/edit-mode/edit-mode.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MasterGuard } from './log-in/master-guard';
import { AuthInceptor } from './log-in/auth.interceptor';
import { MainService } from './main/main.service';
import { EditFormsComponent } from './calendar/edit-mode/edit-forms/edit-forms.component';
import { RaportsComponent } from './calendar/raports/raports.component';
import { ChangePasswordComponent } from './log-in/change-password/change-password.component';
import { RegisterUserComponent } from './main/register-user/register-user.component';
import { SessionService } from './shared/services/session.service';
import { NotFoundComponent } from './log-in/not-found/not-found.component';

@NgModule({
   declarations: [
      AppComponent,
      MainComponent,
      CalendarComponent,
      ForNowComponent,
      ForLaterComponent,
      LogInComponent,
      EditModeComponent,
      RegisterUserComponent,
      EditFormsComponent,
      RaportsComponent,
      ChangePasswordComponent,
      SafePipe,
      EditInvidualComponent,
      PricingComponent,
      NotFoundComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      BrowserAnimationsModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatMenuModule,
      MatCardModule,
      MatInputModule,
      MatSnackBarModule,
      MatCheckboxModule,
      MatProgressSpinnerModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      ReactiveFormsModule,
      CalendarModule.forRoot({
         provide: DateAdapter,
         useFactory: adapterFactory
       }),
    HttpClientModule,
    NgbModalModule,
    MatSelectModule,
    FlatpickrModule.forRoot(),
    MatIconModule,
  ],
  providers: [AuthService, AuthGuard, CalendarService, SessionService, MainService, MasterGuard,
   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInceptor,
      multi: true
   }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
