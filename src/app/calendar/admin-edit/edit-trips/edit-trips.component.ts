import { Component, OnInit } from '@angular/core';
import { KeyValueObject } from 'src/app/shared/models/calendar.model';
import { columns } from '../shared/data/columns.data';
import { MainService } from 'src/app/shared/services/main.service';
import { DataTable, EditTour } from '../shared/models/editatble-table.model';
import { CalendarService } from 'src/app/shared/services/calendar.service';
@Component({
  selector: 'app-edit-trips',
  templateUrl: './edit-trips.component.html',
  styleUrls: ['./edit-trips.component.scss']
})
export class EditTripsComponent implements OnInit {
  toursColumns: KeyValueObject[] = columns.editTours;
  transfersColumns: KeyValueObject[] = columns.editTransfers;
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

  constructor(private mainService: MainService, private calendarService: CalendarService) { }

  ngOnInit() {
    // this.mainService.getTours()
    this.toursData = { rows: this.toursRows, columns: this.toursColumns };
    this.transferData = { rows: this.transferRows, columns: this.transfersColumns };
    // this.mainService.getDrivers();
    // this.mainService.setDriversAsObservable()
    //   .subscribe((res) => {
    //     this.driversBefore = res;
    //     this.hotels = this.driversBefore;
    //   });
    // this.mainService.getTours();
    // this.mainService.setToursAsObservable()
    //   .subscribe((res) => {
    //     this.tours = res;
    //   });
    // this.mainService.getTransfers();
    // this.mainService.setTransfersAsObservable()
    //   .subscribe((res) => {
    //     this.transfers = res;
    //   });
  }
  // SubmitTour(event: EditTour) {
  //   // const values = {
  //   //   Name: event.Name,
  //   //   Price: event.Price,
  //   //   PriceFrom5Persons: event.PriceFrom5Persons,
  //   //   Duration: event.Duration,
  //   //   Commission: event.Commission,
  //   //   CommissionFrom5Persons: event.CommissionFrom5Persons
  //   // };
  //   // this.calendarService.SubmitTour(values);
  //   // this.mainService.getTours();
  // }
  // SubmitTransfer(event: EditTour) {
  //   const values = {
  //     Name: event.Name,
  //     Price: event.Price,
  //     PriceFrom5Persons: event.PriceFrom5Persons,
  //     Duration: event.Duration,
  //     Commission: event.Commission,
  //     CommissionFrom5Persons: event.CommissionFrom5Persons
  //   };
  //   this.calendarService.SubmitTransfer(values);
  // }

  // DeleteUser(eventToDelete: EditTour) {
  //   // this.hotels = this.hotels.filter(event => event !== eventToDelete);
  //   this.calendarService.DeleteDriver(eventToDelete.email);
  //   this.mainService.getDrivers();
  // }

  // DeleteTour(eventToDelete: EditTour) {
  //   // this.tours = this.tours.filter(event => event !== eventToDelete);
  //   this.calendarService.DeleteTour(eventToDelete.Id);
  //   this.mainService.getTours();
  // }
  // DeleteTransfer(eventToDelete: EditTour) {
  //   // this.transfers = this.transfers.filter(event => event !== eventToDelete);
  //   this.calendarService.DeleteTransfer(eventToDelete.Id);
  //   this.mainService.getTransfers();
  // }
  // UpdateTour(event: EditTour) {
  //   const values = {
  //     Name: event.Name,
  //     Price: event.Price,
  //     PriceFrom5Persons: event.PriceFrom5Persons,
  //     Duration: event.Duration,
  //     Commission: event.Commission,
  //     CommissionFrom5Persons: event.CommissionFrom5Persons
  //   };
  //   this.calendarService.UpdateTour(event.Id, values);
  //   this.mainService.getTours();

  // }
  // UpdateTransfer(event: EditTour) {
  //   const values = {
  //     Name: event.Name,
  //     Price: event.Price,
  //     PriceFrom5Persons: event.PriceFrom5Persons,
  //     Duration: event.Duration,
  //     Commission: event.Commission,
  //     CommissionFrom5Persons: event.CommissionFrom5Persons
  //   };
  //   this.calendarService.UpdateTransfer(event.Id, values);
  //   this.mainService.getTransfers();
  // }

  // AddTour(): void {
  //   this.tours.push(
  //     {
  //       Name: 'Salt Mine Wieliczka',
  //       Price: 350,
  //       PriceFrom5Persons: 460,
  //       Duration: 180,
  //       Commission: 70,
  //       CommissionFrom5Persons: 92,
  //     });
  // }
  // AddTransfer(): void {
  //   this.transfers.push(
  //     {
  //       Name: 'Warszawa Airport',
  //       Price: 700,
  //       PriceFrom5Persons: 900,
  //       Duration: 360,
  //       Commission: 140,
  //       CommissionFrom5Persons: 180,
  //     });
  // }
}
