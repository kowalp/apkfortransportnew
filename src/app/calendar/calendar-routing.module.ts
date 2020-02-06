import { EditFormsComponent } from './edit-mode/edit-forms/edit-forms.component';
import { EditModeComponent } from './edit-mode/edit-mode.component';
import { RaportsComponent } from './raports/raports.component';
import { CalendarComponent } from './calendar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditInvidualComponent } from './edit-mode/edit-invidual/edit-invidual.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    children: [
      {
        path: 'reports',
        component: RaportsComponent
      },
      {
        path: 'edit-mode',
        component: EditModeComponent
      },
      {
        path: 'edit-individual',
        component: EditInvidualComponent
      },
      {
        path: 'edit-forms',
        component: EditFormsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
