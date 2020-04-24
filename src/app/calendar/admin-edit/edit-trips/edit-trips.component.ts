import { Component, OnInit } from '@angular/core';
import { KeyValueObject } from 'src/app/shared/models/calendar.model';
import { columns } from '../shared/data/columns.data';
import { MainService } from 'src/app/shared/services/main.service';
import { TourData, DataTable, EditTour } from '../shared/models/editatble-table.model';
@Component({
  selector: 'app-edit-trips',
  templateUrl: './edit-trips.component.html',
  styleUrls: ['./edit-trips.component.scss']
})
export class EditTripsComponent implements OnInit {
  toursColumns: KeyValueObject[] = columns.editTransfers;
  transfersColumns: KeyValueObject[] = columns.editTours;
  toursRows: EditTour[] = [{
    "tour": "dasdf",
    "basicPrice": 3123,
    "advancePrice": 3123,
    "tripLength": "das@das.pl",
    "basicCommission": 312312,
    "advanceCommission": 312312,
  }, {
    "tour": "dasdf",
    "basicPrice": 3123,
    "advancePrice": 3123,
    "tripLength": "das@das.pl",
    "basicCommission": 312312,
    "advanceCommission": 312312,
  }];
  transferRows: EditTour[] = [{
    "transfer": "dasdf",
    "basicPrice": 3123,
    "advancePrice": 3123,
    "tripLength": "das@das.pl",
    "basicCommission": 312312,
    "advanceCommission": 312312,
  }, {
    "transfer": "dasdf",
    "basicPrice": 3123,
    "advancePrice": 3123,
    "tripLength": "das@das.pl",
    "basicCommission": 312312,
    "advanceCommission": 312312,
  }];
  transferData: DataTable;
  toursData: DataTable;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    // this.mainService.getTours()
    this.toursData = { rows: this.toursRows, columns: this.toursColumns };
    this.transferData = { rows: this.transferRows, columns: this.transfersColumns };

  }
}
