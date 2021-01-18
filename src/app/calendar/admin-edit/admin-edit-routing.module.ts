import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditComponent } from './admin-edit.component';
import { EditTripsComponent } from './edit-trips/edit-trips.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditClientsComponent } from './edit-clients/edit-clients.component';
import { EditIndividualComponent } from './edit-individual/edit-individual.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEditComponent,
  },
  {
    path: 'clients',
    component: EditClientsComponent
  },
  {
    path: 'individual',
    component: EditIndividualComponent
  },
  {
    path: 'trips',
    component: EditTripsComponent,
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEditRoutingModule { }
