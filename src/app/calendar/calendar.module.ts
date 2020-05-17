import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from './../shared/utils/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AdminEditModule } from './admin-edit/admin-edit.module';
import { ReportsComponent } from './reports/reports.component';
import { ReportsContentComponent } from './reports/reports-content/reports-content.component';


@NgModule({
  declarations: [
    CalendarComponent,
    ReportsComponent,
    ReportsContentComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminEditModule,
  ]
})
export class CalendarsModule { }
