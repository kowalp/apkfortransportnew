import { NotFoundComponent } from './log-in/not-found/not-found.component';
import { SnackBarService } from './shared/services/snackBar.service';
import { SafePipe } from './calendar/reports/safe.pipe';
import { CalendarService } from './shared/services/calendar.service';
import { AuthGuard } from './shared/guards/auth-guard';
import { AuthService } from './shared/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MasterGuard } from './log-in/master-guard';
import { AuthInceptor } from './log-in/auth.interceptor';
import { MainService } from './shared/services/main.service';
import { SharedModule } from './shared/utils/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
  ],
  providers: [AuthService, AuthGuard, CalendarService, MainService, SnackBarService, MasterGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
