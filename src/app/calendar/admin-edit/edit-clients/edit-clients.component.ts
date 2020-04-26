import { MainService } from '../../../shared/services/main.service';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../shared/services/calendar.service';
import { GetUsers, KeyValueObject } from 'src/app/shared/models/calendar.model';
import { TourData, DataTable } from '../shared/models/editatble-table.model';
import { columns } from '../shared/data/columns.data';


@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.scss']
})
export class EditClientsComponent implements OnInit {
  clientColumns: KeyValueObject[] = columns.clients;
  clientRows: TourData[] = [{
    "arrivalTime": new Date(),
    "name": "Transfer",
    "phone": "533535233",
    "email": "das@das.pl",
    "pickUpFrom": "1231dsa",
    "personCount": "dsa",
    "tour": "d213",
    "transfer": "312das",
    "price": 323,
    "comment": "312dasf",
  }, {
    "arrivalTime": new Date(),
    "name": "Transfer",
    "phone": "533535233",
    "email": "das@das.pl",
    "pickUpFrom": "1231dsa",
    "personCount": "dsa",
    "tour": "d213",
    "transfer": "312das",
    "price": 323,
    "comment": "312dasf",
  }];
  clientsData: DataTable;
  driversBefore: GetUsers[] = [];

  constructor(private calendarService: CalendarService, private mainService: MainService) { }

  ngOnInit() {
    this.clientsData = { rows: this.clientRows, columns: this.clientColumns };
  }
}
