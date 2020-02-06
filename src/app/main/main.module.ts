import { ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ForLaterComponent } from './for-later/for-later.component';
import { ForNowComponent } from './for-now/for-now.component';
import { PricingComponent } from './pricing/pricing.component';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { ChooseCompanyComponent } from './choose-company/choose-company.component';
import { SharedModule } from '../shared/utils/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    PricingComponent,
    ForNowComponent,
    ForLaterComponent,
    EditFormComponent,
    ChooseCompanyComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class MainModule { }
