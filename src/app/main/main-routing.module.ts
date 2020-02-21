import { ForLaterComponent } from './for-later/for-later.component';
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
    path: 'pricing',
    component: PricingComponent,
    pathMatch: 'full'
  },
  {
    path: 'company',
    component: ChooseCompanyComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: ForLaterComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
