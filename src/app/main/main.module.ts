import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ForLaterComponent } from './for-later/for-later.component';
import { PricingComponent } from './pricing/pricing.component';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { ChooseCompanyComponent } from './choose-company/choose-company.component';
import { SharedModule } from '../shared/utils/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule, MatInputModule} from '@angular/material';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
@NgModule({
  declarations: [
    MainComponent,
    PricingComponent,
    ForLaterComponent,
    EditFormComponent,
    ChooseCompanyComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatInputModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
})
export class MainModule { }
