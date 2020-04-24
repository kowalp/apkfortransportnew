import { MainService } from './../../shared/services/main.service';
import { CalendarService } from '../../shared/services/calendar.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User, Food, GetTours } from 'src/app/shared/models/calendar.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-raports',
  templateUrl: './raports.component.html',
  styleUrls: ['./raports.component.scss']
})
export class RaportsComponent implements OnInit {
  raportsForm: FormGroup;
  hotelReport = false;
  imageBlobUrl;
  url: string;
  transfers: Array<GetTours<{ time: any }>> = [];
  receptionist: User[] = [];
  download = false;
  drivers: User[] = [];
  foods: Food[] = [
    { value: 'full', viewValue: 'full' },
    { value: 'tour', viewValue: 'tour' },
    { value: 'transfer', viewValue: 'transfer' }
  ];
  raportTypes: Food[] = [
    { value: 'full', viewValue: 'full' },
    { value: 'tour', viewValue: 'tour' },
    { value: 'transfer', viewValue: 'transfer' }
  ];

  constructor(private authService: AuthService, private calendarService: CalendarService, private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getTransfers();
    this.mainService.setTransfersAsObservable()
      .subscribe((res) => this.transfers = res);
    this.mainService.getDrivers();
    this.mainService.setDriversAsObservable()
      .subscribe((res) => this.drivers = res);
    this.mainService.getReceptionist();
    this.mainService.setReceptionistAsObservable()
      .subscribe((res) => this.receptionist = res);
  }

  // onSubmit(form: NgForm) {
  //   this.url = ``;
  //   this.download = false;
  //   const dateTo = new Date(form.value.ToDate);
  //   const DateFrom = new Date(form.value.FromDate);
  //   const values = {
  //     FromDateYear: DateFrom.getFullYear(),
  //     FromDateMonth: DateFrom.getMonth() + 1,
  //     FromDateDay: DateFrom.getDate(),
  //     ToDateYear: dateTo.getFullYear(),
  //     ToDateMonth: dateTo.getMonth() + 1,
  //     ToDateDay: dateTo.getDate(),
  //     ToDate: new Date(form.value.ToDate).toJSON(),
  //     ReportType: form.value.reportType,
  //     Name: localStorage.getItem('name')
  //   };
  //   if (dateTo && DateFrom && form.value.reportType) {
  //     const formated = `${values.FromDateYear}/${values.FromDateMonth}/${values.FromDateDay}/${values.ToDateYear}/${values.ToDateMonth}`;
  //     this.url = `http://51.68.143.24:5000/pdfgenerator/hotelReport/${formated}/${values.ToDateDay}/${values.ReportType}/${values.Name}`;
  //     this.download = true;
  //   }
  // }
  // onSubmit2(form: NgForm) {
  //   this.url = ``;
  //   this.download = false;
  //   const dateTo = new Date(form.value.ToDate);
  //   const DateFrom = new Date(form.value.FromDate);

  //   const values = {
  //     FromDateYear: DateFrom.getFullYear(),
  //     FromDateMonth: DateFrom.getMonth() + 1,
  //     FromDateDay: DateFrom.getDate(),
  //     ToDateYear: dateTo.getFullYear(),
  //     ToDateMonth: dateTo.getMonth() + 1,
  //     ToDateDay: dateTo.getDate(),
  //     ToDate: new Date(form.value.ToDate).toJSON(),
  //     Type: form.value.type,
  //     DriverId: form.value.driverId
  //   };
  //   if (dateTo && DateFrom && values.Type && values.DriverId) {
  //     const formated = `${values.FromDateYear}/${values.FromDateMonth}/${values.FromDateDay}/${values.ToDateYear}/${values.ToDateMonth}`;
  //     this.url = `http://51.68.143.24:5000/pdfgenerator/driverReport/${formated}/${values.ToDateDay}/${values.Type}/${values.DriverId}`;
  //     this.download = true;
  //   }
  // }
  // submitHotel(form: NgForm) {
  //   this.url = ``;
  //   this.download = false;
  //   const dateTo = new Date(form.value.ToDate);
  //   const DateFrom = new Date(form.value.FromDate);
  //   const values = {
  //     FromDateYear: DateFrom.getFullYear(),
  //     FromDateMonth: DateFrom.getMonth() + 1,
  //     FromDateDay: DateFrom.getDate(),
  //     ToDateYear: dateTo.getFullYear(),
  //     ToDateMonth: dateTo.getMonth() + 1,
  //     ToDateDay: dateTo.getDate(),
  //     ToDate: new Date(form.value.ToDate).toJSON(),
  //     ReportType: form.value.type,
  //     Name: form.value.hotelName
  //   };
  //   if (dateTo && DateFrom && values.ReportType) {
  //     const formated = `${values.FromDateYear}/${values.FromDateMonth}/${values.FromDateDay}/${values.ToDateYear}/${values.ToDateMonth}`;
  //     this.url = `http://51.68.143.24:5000/pdfgenerator/hotelReport/${formated}/${values.ToDateDay}/${values.ReportType}/${values.Name}`;
  //     this.download = true;
  //   }
  // }
  // onSubmit3(form: NgForm) {
  //   const dateTo = new Date(form.value.ToDate);
  //   const DateFrom = new Date(form.value.FromDate);
  //   this.url = ``;
  //   this.download = false;
  //   const values = {
  //     FromDateYear: DateFrom.getFullYear(),
  //     FromDateMonth: DateFrom.getMonth() + 1,
  //     FromDateDay: DateFrom.getDate(),
  //     ToDateYear: dateTo.getFullYear(),
  //     ToDateMonth: dateTo.getMonth() + 1,
  //     ToDateDay: dateTo.getDate(),
  //     ToDate: new Date(form.value.ToDate).toJSON(),
  //   };
  //   if (dateTo && DateFrom) {
  //     const formated = `${values.FromDateYear}/${values.FromDateMonth}/${values.FromDateDay}/${values.ToDateYear}/${values.ToDateMonth}`;
  //     this.url = `http://51.68.143.24:5000/pdfgenerator/fullreport/${formated}/${values.ToDateDay}`;
  //     this.download = true;
  //   }
  // }
  logOut() {
    this.authService.Logout();
  }
  // checked() {
  //   this.driverReport === true ? this.driverReport = false : this.driverReport = true;
  //   this.hotelReport = false;
  // }
  // checked2() {
  //   this.hotelReport === true ? this.hotelReport = false : this.hotelReport = true;
  //   this.driverReport = false;
  // }
  // changeCommision() {
  //   const email = localStorage.getItem('email');
  //   for (const key in this.receptionist) {
  //     if (this.receptionist[key].email === email) {
  //       localStorage.setItem('name', this.receptionist[key].name);
  //     }
  //   }
  //   const name = localStorage.getItem('name');
  //   if (name === 'Hotel Imperial' || name === 'Hotel Shalom') {
  //     for (const key in this.transfers) {
  //       if (this.transfers[key].Name === 'Lotnisko Balice') {
  //         const values = {
  //           Commission: 35,
  //           CommissionFrom5Persons: 50,
  //           Price: 100,
  //           PriceFrom5Persons: 150
  //         };
  //         this.calendarService.UpdateTransfer(this.transfers[key].Id, values)
  //         .subscribe((data: any) => {
  //         },
  //         (err: HttpErrorResponse) => {
  //           console.log(err );
  //         });
  //       }
  //     }
  //   } else if (name === 'Hotel Indigo' || name === 'Hotel Apart Zwierzyniecka') {
  //     for (const key in this.transfers) {
  //       if (this.transfers[key].Name === 'Lotnisko Balice') {
  //         const values = {
  //           Commission: 40,
  //           CommissionFrom5Persons: 60,
  //           Price: 100,
  //           PriceFrom5Persons: 150
  //         };
  //         this.calendarService.UpdateTransfer(this.transfers[key].Id, values)
  //         .subscribe((data: any) => {
  //         },
  //         (err: HttpErrorResponse) => {
  //           console.log(err );
  //         });
  //       }
  //     }
  //   } else if (name === 'Hotel Polski' ) {
  //     for (const key in this.transfers) {
  //       if (this.transfers[key].Name === 'Lotnisko Balice') {
  //         const values = {
  //           Commission: 30,
  //           CommissionFrom5Persons: 30,
  //           PriceFrom5Persons: 120,
  //           Price: 90,
  //         };
  //         this.calendarService.UpdateTransfer(this.transfers[key].Id, values)
  //         .subscribe((data: any) => {
  //         },
  //         (err: HttpErrorResponse) => {
  //           console.log(err );
  //         });
  //       }
  //     }
  //   } else {
  //     for (const key in this.transfers) {
  //       if (this.transfers[key].Name === 'Lotnisko Balice') {
  //         const values = {
  //           Commission: 30,
  //           CommissionFrom5Persons: 50,
  //           Price: 90,
  //           PriceFrom5Persons: 150
  //         };
  //         this.calendarService.UpdateTransfer(this.transfers[key].Id, values)
  //         .subscribe((data: any) => {
  //         },
  //         (err: HttpErrorResponse) => {
  //           console.log(err );
  //         });
  //       }
  //     }
  //   }
  // }
}
