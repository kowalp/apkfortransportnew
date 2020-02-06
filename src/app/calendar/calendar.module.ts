import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from './../shared/utils/shared.module';
import { FormsModule } from '@angular/forms';
import { EditFormsComponent } from './edit-mode/edit-forms/edit-forms.component';
import { EditModeComponent } from './edit-mode/edit-mode.component';
import { RaportsComponent } from './raports/raports.component';
import { CalendarComponent } from './calendar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditInvidualComponent } from './edit-mode/edit-invidual/edit-invidual.component';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
@NgModule({
  declarations: [
    CalendarComponent,
    RaportsComponent,
    EditModeComponent,
    EditInvidualComponent,
    EditFormsComponent,
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
    SharedModule
  ]
})
export class CalendarsModule { }
