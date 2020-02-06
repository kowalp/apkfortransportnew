import { MainService } from './../../../shared/services/main.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../shared/services/calendar.service';
import { GetTours, GetUsers, GetHotel } from 'calendar-utils';


@Component({
  selector: 'app-edit-forms',
  templateUrl: './edit-forms.component.html',
  styleUrls: ['./edit-forms.component.scss']
})
export class EditFormsComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  tours: Array<GetTours<{ time: any }>> = [];
  transfers: Array<GetTours<{ time: any }>> = [];
  hotels: GetUsers[] = [];
  driversBefore: GetUsers[] = [];
  modalData: {
    action: string;
    tours: GetTours;
    transfers: GetTours;
    hotels: GetHotel;
  };

  constructor(private calendarService: CalendarService, private authService: AuthService, private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getDrivers();
    this.mainService.setDriversAsObservable()
      .subscribe((res) => {
        this.driversBefore = res;
        this.hotels = this.driversBefore;
      });
    this.mainService.getTours();
    this.mainService.setToursAsObservable()
      .subscribe((res) => {
        this.tours = res;
      });
    this.mainService.getTransfers();
    this.mainService.setTransfersAsObservable()
      .subscribe((res) => {
        this.transfers = res;
      });
  }
  SubmitTour(event: GetTours) {
    const values = {
      Name: event.Name,
      Price: event.Price,
      PriceFrom5Persons: event.PriceFrom5Persons,
      Duration: event.Duration,
      Commission: event.Commission,
      CommissionFrom5Persons: event.CommissionFrom5Persons
    };
    this.calendarService.SubmitTour(values);
    this.mainService.getTours();
  }
  SubmitTransfer(event: GetTours) {
    const values = {
      Name: event.Name,
      Price: event.Price,
      PriceFrom5Persons: event.PriceFrom5Persons,
      Duration: event.Duration,
      Commission: event.Commission,
      CommissionFrom5Persons: event.CommissionFrom5Persons
    };
    this.calendarService.SubmitTransfer(values);
  }

  DeleteUser(eventToDelete: GetUsers) {
    // this.hotels = this.hotels.filter(event => event !== eventToDelete);
    this.calendarService.DeleteDriver(eventToDelete.email);
    this.mainService.getDrivers();
  }

  DeleteTour(eventToDelete: GetTours) {
    // this.tours = this.tours.filter(event => event !== eventToDelete);
    this.calendarService.DeleteTour(eventToDelete.Id);
    this.mainService.getTours();
  }
  DeleteTransfer(eventToDelete: GetTours) {
    // this.transfers = this.transfers.filter(event => event !== eventToDelete);
    this.calendarService.DeleteTransfer(eventToDelete.Id);
    this.mainService.getTransfers();
  }
  UpdateTour(event: GetTours) {
    const values = {
      Name: event.Name,
      Price: event.Price,
      PriceFrom5Persons: event.PriceFrom5Persons,
      Duration: event.Duration,
      Commission: event.Commission,
      CommissionFrom5Persons: event.CommissionFrom5Persons
    };
    this.calendarService.UpdateTour(event.Id, values);
    this.mainService.getTours();

  }
  UpdateTransfer(event: GetTours) {
    const values = {
      Name: event.Name,
      Price: event.Price,
      PriceFrom5Persons: event.PriceFrom5Persons,
      Duration: event.Duration,
      Commission: event.Commission,
      CommissionFrom5Persons: event.CommissionFrom5Persons
    };
    this.calendarService.UpdateTransfer(event.Id, values);
    this.mainService.getTransfers();
  }

  AddTour(): void {
    this.tours.push(
      {
        Name: 'Salt Mine Wieliczka',
        Price: 350,
        PriceFrom5Persons: 460,
        Duration: 180,
        Commission: 70,
        CommissionFrom5Persons: 92,
      });
  }
  AddTransfer(): void {
    this.transfers.push(
      {
        Name: 'Warszawa Airport',
        Price: 700,
        PriceFrom5Persons: 900,
        Duration: 360,
        Commission: 140,
        CommissionFrom5Persons: 180,
      });
  }
  logOut() {
    this.authService.Logout();
  }
}
