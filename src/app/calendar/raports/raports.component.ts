import { HttpErrorResponse } from '@angular/common/http';
import { CalendarService } from './../calendar.service';
import { MainService } from './../../main/main.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/log-in/auth.service';

export interface GetTours<MetaType = any> {
  Id?: number;
  Name: string;
  Price: number;
  PriceFrom5Persons: number;
  Duration: number;
  Commission: number;
  CommissionFrom5Persons: number;
}
export interface Food {
  value: string;
  viewValue: string;
}
export interface User {
  id: number;
  email: string;
  name: string;
}

@Component({
  selector: 'app-raports',
  templateUrl: './raports.component.html',
  styleUrls: ['./raports.component.scss']})
export class RaportsComponent implements OnInit {
  isMaster = false;
  hotelReport = false;
  imageBlobUrl;
  url;
  driversBefore: User[] = [];
  receptionistBefore: User[] = [];

  transfers: Array<GetTours<{ time: any }>>  = [
  ];
  receptionist: User[] = [];
  download = false;
  driverReport = false;
  constructor(private mainService: MainService, private authService: AuthService,
              private calendarService: CalendarService) {}
  foods: Food[] = [
    {value: 'full', viewValue: 'full'},
    {value: 'tour', viewValue: 'tour'},
    {value: 'transfer', viewValue: 'transfer'}
  ];
  raportTypes: Food[] = [
    {value: 'full', viewValue: 'full'},
    {value: 'tour', viewValue: 'tour'},
    {value: 'transfer', viewValue: 'transfer'}
  ];
  isDriver = false;
  drivers: User[] = [
  ];
   ngOnInit(): void {
    this.isDriver = false;
    this.isMaster = false;
    if (localStorage.getItem('role') === 'driver') {
      this.isDriver = true;
    }
    localStorage.getItem('role') === 'master' ? this.isMaster = true : this.isMaster = false ;
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
              Commission: res[key].commision,
              CommissionFrom5Persons: res[key].commissionFrom5Persons
            };
            this.transfers.push(element);
          }
        }
      }
    );
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
          this.drivers = this.driversBefore;
        }, 200);
      }
    );
    this.calendarService.getReceptionist()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              id: res[key].id,
              email: res[key].email,
              name: res[key].name,
            };
            this.receptionistBefore.push(element);
          }
        }
        setTimeout(() => {
          this.receptionist = this.receptionistBefore;
        }, 200);
      }
    );
    this.changeCommision();
   }
  onSubmit(form: NgForm) {
    this.url = ``;
    this.download = false;
    const dateTo = new Date(form.value.ToDate);
    const DateFrom = new Date(form.value.FromDate);
    const values = {
      FromDateYear: DateFrom.getFullYear(),
      FromDateMonth: DateFrom.getMonth() + 1,
      FromDateDay: DateFrom.getDate(),
      ToDateYear: dateTo.getFullYear(),
      ToDateMonth: dateTo.getMonth() + 1,
      ToDateDay: dateTo.getDate(),
      ToDate: new Date(form.value.ToDate).toJSON(),
      ReportType: form.value.reportType,
      Name: localStorage.getItem('name')
    };
    if (dateTo && DateFrom && form.value.reportType) {
      const formated = `${values.FromDateYear}/${values.FromDateMonth}/${values.FromDateDay}/${values.ToDateYear}/${values.ToDateMonth}`;
      this.url = `http://51.68.143.24:5000/pdfgenerator/hotelReport/${formated}/${values.ToDateDay}/${values.ReportType}/${values.Name}`;
      this.download = true;
    }
   }
   onSubmit2(form: NgForm) {
    this.url = ``;
    this.download = false;
    const dateTo = new Date(form.value.ToDate);
    const DateFrom = new Date(form.value.FromDate);

    const values = {
      FromDateYear: DateFrom.getFullYear(),
      FromDateMonth: DateFrom.getMonth() + 1,
      FromDateDay: DateFrom.getDate(),
      ToDateYear: dateTo.getFullYear(),
      ToDateMonth: dateTo.getMonth() + 1,
      ToDateDay: dateTo.getDate(),
      ToDate: new Date(form.value.ToDate).toJSON(),
      Type: form.value.type,
      DriverId: form.value.driverId
    };
    if (dateTo && DateFrom && values.Type && values.DriverId) {
      const formated = `${values.FromDateYear}/${values.FromDateMonth}/${values.FromDateDay}/${values.ToDateYear}/${values.ToDateMonth}`;
      this.url = `http://51.68.143.24:5000/pdfgenerator/driverReport/${formated}/${values.ToDateDay}/${values.Type}/${values.DriverId}`;
      this.download = true;
    }
   }
   submitHotel(form: NgForm) {
    this.url = ``;
    this.download = false;
    const dateTo = new Date(form.value.ToDate);
    const DateFrom = new Date(form.value.FromDate);
    const values = {
      FromDateYear: DateFrom.getFullYear(),
      FromDateMonth: DateFrom.getMonth() + 1,
      FromDateDay: DateFrom.getDate(),
      ToDateYear: dateTo.getFullYear(),
      ToDateMonth: dateTo.getMonth() + 1,
      ToDateDay: dateTo.getDate(),
      ToDate: new Date(form.value.ToDate).toJSON(),
      ReportType: form.value.type,
      Name: form.value.hotelName
    };
    console.log(form.value.hotelName);
    if (dateTo && DateFrom && values.ReportType) {
      const formated = `${values.FromDateYear}/${values.FromDateMonth}/${values.FromDateDay}/${values.ToDateYear}/${values.ToDateMonth}`;
      this.url = `http://51.68.143.24:5000/pdfgenerator/hotelReport/${formated}/${values.ToDateDay}/${values.ReportType}/${values.Name}`;
      this.download = true;
    }
   }
   onSubmit3(form: NgForm) {
    const dateTo = new Date(form.value.ToDate);
    const DateFrom = new Date(form.value.FromDate);
    this.url = ``;
    this.download = false;
    const values = {
      FromDateYear: DateFrom.getFullYear(),
      FromDateMonth: DateFrom.getMonth() + 1,
      FromDateDay: DateFrom.getDate(),
      ToDateYear: dateTo.getFullYear(),
      ToDateMonth: dateTo.getMonth() + 1,
      ToDateDay: dateTo.getDate(),
      ToDate: new Date(form.value.ToDate).toJSON(),
    };
    if (dateTo && DateFrom) {
      const formated = `${values.FromDateYear}/${values.FromDateMonth}/${values.FromDateDay}/${values.ToDateYear}/${values.ToDateMonth}`;
      this.url = `http://51.68.143.24:5000/pdfgenerator/fullreport/${formated}/${values.ToDateDay}`;
      this.download = true;
    }
   }
   logOut() {
    this.authService.Logout();
  }
  checked() {
    this.driverReport === true ? this.driverReport = false : this.driverReport = true;
    this.hotelReport = false;
  }
  checked2() {
    this.hotelReport === true ? this.hotelReport = false : this.hotelReport = true;
    this.driverReport = false;
  }
  changeCommision() {
    const email = localStorage.getItem('email');
    for (const key in this.receptionist) {
      if (this.receptionist[key].email === email) {
        localStorage.setItem('name', this.receptionist[key].name);
      }
    }
    const name = localStorage.getItem('name');
    if (name === 'Hotel Imperial' || name === 'Hotel Shalom') {
      for (const key in this.transfers) {
        if (this.transfers[key].Name === 'Lotnisko Balice') {
          const values = {
            Commission: 35,
            CommissionFrom5Persons: 50,
            Price: 100,
            PriceFrom5Persons: 150
          };
          this.calendarService.UpdateTransfer(this.transfers[key].Id, values)
          .subscribe((data: any) => {
          },
          (err: HttpErrorResponse) => {
            console.log(err );
          });
        }
      }
    } else if (name === 'Hotel Indigo' || name === 'Hotel Apart Zwierzyniecka') {
      for (const key in this.transfers) {
        if (this.transfers[key].Name === 'Lotnisko Balice') {
          const values = {
            Commission: 40,
            CommissionFrom5Persons: 60,
            Price: 100,
            PriceFrom5Persons: 150
          };
          this.calendarService.UpdateTransfer(this.transfers[key].Id, values)
          .subscribe((data: any) => {
          },
          (err: HttpErrorResponse) => {
            console.log(err );
          });
        }
      }
    } else if (name === 'Hotel Polski' ) {
      for (const key in this.transfers) {
        if (this.transfers[key].Name === 'Lotnisko Balice') {
          const values = {
            Commission: 30,
            CommissionFrom5Persons: 30,
            PriceFrom5Persons: 120,
            Price: 90,
          };
          this.calendarService.UpdateTransfer(this.transfers[key].Id, values)
          .subscribe((data: any) => {
          },
          (err: HttpErrorResponse) => {
            console.log(err );
          });
        }
      }
    } else {
      for (const key in this.transfers) {
        if (this.transfers[key].Name === 'Lotnisko Balice') {
          const values = {
            Commission: 30,
            CommissionFrom5Persons: 50,
            Price: 90,
            PriceFrom5Persons: 150
          };
          this.calendarService.UpdateTransfer(this.transfers[key].Id, values)
          .subscribe((data: any) => {
          },
          (err: HttpErrorResponse) => {
            console.log(err );
          });
        }
      }
    }
  }
 }
