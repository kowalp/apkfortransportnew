import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditTripsComponent } from './edit-trips/edit-trips.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { AdminEditComponent } from './admin-edit.component';
import { AdminEditRoutingModule } from './admin-edit-routing.module';
import { SharedModule } from 'src/app/shared/utils/shared.module';
import { EditIndividualComponent } from './edit-individual/edit-individual.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditClientsComponent } from './edit-clients/edit-clients.component';
import { BasicModalComponent } from './shared/utils/basic-modal/basic-modal.component';
import { ModalModule } from 'ngb-modal';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminEditComponent,
    EditTripsComponent,
    EditClientsComponent,
    EditableTableComponent,
    EditIndividualComponent,
    BasicModalComponent,
  ],
  imports: [
    CommonModule,
    AdminEditRoutingModule,
    SharedModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    EditableTableComponent
  ]
})
export class AdminEditModule { }
