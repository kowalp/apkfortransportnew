import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../log-in/auth.service';
import { CalendarService } from './calendar.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ElementRef,
  Renderer2
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

export interface CalendarEvent<MetaType = any> {
  Id?: number;
  Name?: string | number;
  start: Date;
  end: Date;
  title: string;
  Email: string;
  Phone: string;
  Transfer: string;
  Trip: string;
  PersonCount: string;
  Comment?: string;
  PickupFrom?: string;
  FlightNumber?: string;
  Price: number;
  TourType?: string;
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
      beforeStart?: boolean;
      afterEnd?: boolean;
  };
  draggable?: boolean;
  meta?: MetaType;
}

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  hotelForm: Array<CalendarEvent<{ time: any }>> = [];
  receptionistForm: Array<CalendarEvent<{ time: any }>> = [];
  invidualForm: Array<CalendarEvent<{ time: any }>> = [];
  allFroms: Array<CalendarEvent<{ time: any }>> = [];
  tours = [];
  transfers = [];
  isMaster = false;
  isDriver = false;
  doneTrip = false;
  constructor(private modal: NgbModal, private calendarService: CalendarService, private authService: AuthService,
              private snackBar: MatSnackBar, private rd: Renderer2) {
  }
  @ViewChild('checkBox', { static: false }) el: ElementRef;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [
  ];

  activeDayIsOpen = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
  ngOnInit() {
    this.isMaster = false;
    this.isDriver = false;
    if (localStorage.getItem('role') === 'master') {
      this.isMaster  = true;
    }
    if (localStorage.getItem('role') === 'driver') {
      this.isDriver = true;
    }
    this.isDriver === true ? this.view = CalendarView.Day : this.view = CalendarView.Week;

    this.calendarService.getTours()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              name: res[key].name,
              price: res[key].price,
              PriceFrom5Persons: res[key].PriceFrom5Persons,
              duration: res[key].duration,
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
              name: res[key].name,
              price: res[key].price,
              PriceFrom5Persons: res[key].PriceFrom5Persons,
              duration: res[key].duration,
            };
            this.transfers.push(element);
          }
        }
      }
    );
    if (localStorage.getItem('role') === 'receptionist') {
      setTimeout(() => {
        const nameOfTheHotel = localStorage.getItem('name');
        this.calendarService.hotelFormsForHotel(nameOfTheHotel)
        .subscribe(
          (res) => {
            for (const key in res) {
              if (res.hasOwnProperty(key)) {
                const element = {
                  Id: res[key].id,
                  Name: res[key].name || '',
                  start: this.getStartTime(res[key].arrivalTime),
                  end:  this.getEndTime(new Date(res[key].arrivalTime),
                  res[key].tour !== 'Trip' && res[key].tour !== null ? res[key].tour : res[key].transfer),
                  title: this.getTitle(res[key].title, res[key].tour, res[key].transfer),
                  Email: res[key].email || '',
                  Phone: res[key].phone || '',
                  Transfer: res[key].transfer || '',
                  Trip: res[key].tour || '',
                  PersonCount: res[key].personCount,
                  Price: res[key].tour !== 'Trip' && res[key].tour !== null ?
                  this.getPriceTo(res[key].tour) : this.getPriceTr(res[key].transfer),
                  TourType: 'hotel'
                };
                this.receptionistForm.push(element);
              }
            }
          });
        setTimeout(() => {
          this.events = [...this.receptionistForm];
        }, 700);
      }, 100);
    }
    if (localStorage.getItem('role') === 'master' || localStorage.getItem('role') === 'driver') {
      setTimeout( () => {
        this.calendarService.hotelForms()
        .subscribe(
          (res) => {
            for (const key in res) {
              if (res.hasOwnProperty(key)) {
                const element = {
                  Id: res[key].id,
                  Name: res[key].name || '',
                  start: this.getStartTime(res[key].arrivalTime),
                  end:  this.getEndTime(new Date(res[key].arrivalTime),
                  res[key].tour !== 'Trip' && res[key].tour !== null ? res[key].tour : res[key].transfer),
                  title: this.getTitle(res[key].title, res[key].tour, res[key].transfer),
                  Email: res[key].email || '',
                  Phone: res[key].phone || '',
                  Transfer: res[key].transfer || '',
                  Trip: res[key].tour || '',
                  PersonCount: res[key].personCount,
                  Price: res[key].tour !== 'Trip' && res[key].tour !== null ?
                  this.getPriceTo(res[key].tour) : this.getPriceTr(res[key].transfer),
                  TourType: 'hotel'
                };
                this.invidualForm.push(element);
              }
            }
          });
        this.calendarService.invidualForms()
        .subscribe(
          (res) => {
            for (const key in res) {
              if (res.hasOwnProperty(key)) {
                const element = {
                  Id: res[key].id,
                  Name: res[key].name || '',
                  start: this.getStartTime(res[key].arrivalTime),
                  end: this.getEndTime(new Date(res[key].arrivalTime),
                  res[key].tour !== 'Trip' && res[key].tour !== null ? res[key].tour : res[key].transfer),
                  title: this.getTitle(res[key].title, res[key].tour, res[key].transfer),
                  Email: res[key].email || '',
                  Phone: res[key].phone || '',
                  Transfer: res[key].transfer || '',
                  Trip: res[key].tour || '',
                  PersonCount: res[key].personCount,
                  Price: res[key].price || (res[key].tour !== 'Trip' && res[key].tour !== null ?
                  this.getPriceTo(res[key].tour) : this.getPriceTr(res[key].transfer)),
                  PickupFrom: res[key].pickupFrom,
                  Comment: res[key].comment,
                  FlightNumber: res[key].flightNumber,
                  TourType: 'individual'
                };
                this.hotelForm.push(element);
              }
            }
        });
        setTimeout(() => {
          this.allFroms = [...this.hotelForm, ...this.invidualForm];
          this.events = this.allFroms;
          }, 700);
      }, 100);
    }
  }
  getStartTime(time: Date) {
    return moment(time).add(120, 'm').toDate();
  }
  getEndTime(time: Date, tour: string) {
    for (const key of this.tours || this.transfers) {
      if (tour === key.name) {
        const newDate = moment(time).add(120 + key.duration, 'm').toDate();
        return newDate;
      }
    }
    return moment(time).add(180, 'm').toDate();
  }
  getTitle(title, trip, transfer) {
    if (title !== null) {
      return title;
    } else if (transfer !== 'Transfer' && transfer !== null) {
      return transfer;
    } else {
      return trip;
    }
  }
  getPriceTo(tour: string) {
    for (const key of this.tours) {
      if (tour === key.name) {
        return key.price;
      }
    }
    return '';
  }
  getPriceTr(tour: string) {
    for (const key of this.transfers) {
      if (tour === key.name) {
        return key.price;
      }
    }
    return '';
  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  logOut() {
    this.authService.Logout();
  }
openSnackBar() {
  this.snackBar.open('Dziękujemy!', 'Zostałeś oznaczony jako wykonawca wycieczki!', {
    duration: 2000,
  });
}
checked() {
  this.doneTrip === false ? this.doneTrip = true : this.doneTrip = false;
}
onSubmit(e) {
  const arrayOfData = {
    UserEmail: localStorage.getItem('email'),
    BookingId: e.Id,
    BookingFormEmail: e.Email,
    FormType: e.TourType
  };
  this.calendarService.addBookingForDriver(arrayOfData)
  .subscribe((data: any) => {
    this.openSnackBar();
  },
  (err: HttpErrorResponse) => {
    console.log(err );
  });
  this.doneTrip = false;

}

}

