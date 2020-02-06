import { ForLaterComponent } from './for-later/for-later.component';
import { ForNowComponent } from './for-now/for-now.component';
import { ChooseCompanyComponent } from './choose-company/choose-company.component';
import { PricingComponent } from './pricing/pricing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: ChooseCompanyComponent,
    children: [
      {
        path: 'pricing',
        component: PricingComponent,
      },
      {
        path: 'for-now',
        component: ForNowComponent,
      },
      {
        path: 'for-later',
        component: ForLaterComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
