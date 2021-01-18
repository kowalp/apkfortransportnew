import { ReportsComponent } from './reports/reports.component';
import { CalendarComponent } from './calendar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'edit',
    loadChildren: () => import('./admin-edit/admin-edit.module').then(m => m.AdminEditModule),
    data: {
      featureType: 'main'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
