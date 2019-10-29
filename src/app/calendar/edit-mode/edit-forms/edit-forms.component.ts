import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../../log-in/auth.service';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../calendar.service';

export interface GetHotel<MetaType = any> {
  Id?: number;
  HotelName: string;
}
export interface GetUsers<MetaType = any> {
  id?: number;
  email: string;
  name: string;
  role?: string;
}
export interface GetTours<MetaType = any> {
  Id?: number;
  Name: string;
  Price: number;
  PriceFrom5Persons: number;
  Duration: number;
  Commission: number;
  CommissionFrom5Persons: number;
}
@Component({
  selector: 'app-edit-forms',
  templateUrl: './edit-forms.component.html',
  styleUrls: ['./edit-forms.component.scss']
})
export class EditFormsComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  tours: Array<GetTours<{ time: any }>> = [
  ];
  transfers: Array<GetTours<{ time: any }>>  = [
  ];
  hotels: GetUsers[] = [
  ];
  driversBefore: GetUsers[] = [];
  modalData: {
    action: string;
    tours: GetTours;
    transfers: GetTours;
    hotels: GetHotel;
  };
  constructor(private calendarService: CalendarService, private authService: AuthService, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.calendarService.getDrivers()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              id: res[key].id,
              email: res[key].email,
              name: res[key].name,
            };
            this.driversBefore.push(element);
          }
        }
        setTimeout(() => {
          this.hotels = this.driversBefore;
        }, 200);
      }
    );
    this.calendarService.getTours()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              Id: res[key].id,
              Name: res[key].name,
              Price: res[key].price,
              PriceFrom5Persons: res[key].priceFrom5Persons,
              Duration: res[key].duration,
              Commission: res[key].commission,
              CommissionFrom5Persons: res[key].commissionFrom5Persons
            };
            this.tours.push(element);
          }
        }
      }
    );
    this.calendarService.getTransfers()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              Id: res[key].id,
              Name: res[key].name,
              Price: res[key].price,
              PriceFrom5Persons: res[key].priceFrom5Persons,
              Duration: res[key].duration,
              Commission: res[key].commission,
              CommissionFrom5Persons: res[key].commissionFrom5Persons
            };
            this.transfers.push(element);
          }
        }
      }
    );
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
    this.calendarService.SubmitTrip(values)
    .subscribe((data: any) => {
      this.openSnackBar();
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
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
    this.calendarService.SubmitTransfer(values)
    .subscribe((data: any) => {
      this.openSnackBar();
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }
  DeleteUser(eventToDelete: GetUsers) {
    this.hotels = this.hotels.filter(event => event !== eventToDelete);
    this.calendarService.DeleteDriver(eventToDelete.email)
    .subscribe((res) => this.deleteSnackBar());
  }
  DeleteTour(eventToDelete: GetTours) {
    this.tours = this.tours.filter(event => event !== eventToDelete);
    this.calendarService.DeleteTrip(eventToDelete.Id)
    .subscribe((data: any) => {
      this.deleteSnackBar();
        },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }
  DeleteTransfer(eventToDelete: GetTours) {
    this.transfers = this.transfers.filter(event => event !== eventToDelete);
    this.calendarService.DeleteTransfer(eventToDelete.Id)
    .subscribe((data: any) => {
      this.deleteSnackBar();
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
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
    this.calendarService.UpdateTrip(event.Id, values)
    .subscribe((data: any) => {
      this.openSnackBar();
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
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
    this.calendarService.UpdateTransfer(event.Id, values)
    .subscribe((data: any) => {
      this.openSnackBar();
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }
  AddTour(): void {
    this.tours = [
      ...this.tours,
    {
      Name: 'Salt Mine Wieliczka',
      Price: 350,
      PriceFrom5Persons: 460,
      Duration: 180,
      Commission: 70,
      CommissionFrom5Persons: 92,
        }
      ];
  }
  AddTransfer(): void {
    this.transfers = [
      ...this.transfers,
    {
      Name: 'Warszawa Airport',
      Price: 700,
      PriceFrom5Persons: 900,
      Duration: 360,
      Commission: 140,
      CommissionFrom5Persons: 180,
        }
      ];
  }
  logOut() {
    this.authService.Logout();
  }
  openSnackBar() {
    this.snackBar.open('Dziękujemy!', 'Dane zostały zapisane do bazy!', {
      duration: 2000,
    });
  }
  deleteSnackBar() {
    this.snackBar.open('Dziękujemy!', 'Dane zostały usunięte!', {
      duration: 2000,
    });
  }
}
