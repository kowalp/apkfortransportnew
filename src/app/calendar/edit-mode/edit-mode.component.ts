import { CalendarService } from './../calendar.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
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
import { AuthService } from 'src/app/log-in/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarEvent } from '../calendar.component';

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
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit {
  @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any>;
  hotelForm: Array<CalendarEvent<{ time: any }>> = [];
  invidualForm: Array<CalendarEvent<{ time: any }>> = [];
  filteredForm: Array<CalendarEvent<{ time: any }>> = [];
  allFroms: Array<CalendarEvent<{ time: any }>> = [];
  tours = [];
  transfers = [];
  toursArray = [];
  ppl = ['1-4', '5-8', 'MORE'];
  transfersArray = [];
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

  constructor(private modal: NgbModal, private calendarService: CalendarService, private authService: AuthService,
              private snackBar: MatSnackBar) {
  }
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [
  ];

  activeDayIsOpen = true;

  ngOnInit() {
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
            this.toursArray.push(res[key].name);
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
            this.transfersArray.push(res[key].name);
            this.transfers.push(element);
          }
        }
      }
    );
    this.calendarService.hotelForms()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              Id: res[key].id,
              Name: res[key].name || '',
              start: new Date(res[key].arrivalTime),
              end:
              this.getEndTime(new Date(res[key].arrivalTime),
              res[key].tour !== 'Trip' && res[key].tour !== null ? res[key].tour : res[key].transfer),
              title: res[key].title || res[key].tour || res[key].transfer,
              Email: res[key].email || '',
              Phone: res[key].phone || '',
              Transfer: res[key].transfer || '',
              Trip: res[key].tour || '',
              PersonCount: res[key].personCount,
              Price: res[key].tour !== 'Trip' && res[key].tour !== null ?
              this.getPriceTo(res[key].tour) : this.getPriceTr(res[key].transfer)
            };
            this.invidualForm.push(element);
          }
        }
        setTimeout(() => {
          this.allFroms = [...this.hotelForm, ...this.invidualForm];
          this.events = this.allFroms;
          }, 500);
      });
  }

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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  getEndTime(time: Date, tour: string) {
    for (const key of this.tours || this.transfers) {
      if (tour === key.name) {
        const newDate = moment(time).add(key.duration, 'm').toDate();
        return newDate;
      }
    }
    for (const key of this.tours || this.transfers) {
      return moment(time).add(60, 'm').toDate();
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
  getPriceToFor5to8(tour: string) {
    for (const key of this.tours) {
      if (tour === key.name) {
        return key.PriceFrom5Persons;
      }
    }
    return '';
  }
  getPriceTrFor5to8(tour: string) {
    for (const key of this.transfers) {
      if (tour === key.name) {
        return key.PriceFrom5Persons;
      }
    }
    return '';
  }
  addEvent(): void {
    this.events = [
      ...this.events,
    {
      start: new Date(moment().format()),
      Name: 'Test',
      title: 'Kraków round Trip',
      Email: 'dsa@o2.pl',
      Phone: '000000000',
      end: new Date(moment().add(60, 'm').toDate()),
      Transfer: '',
      Trip: '',
      PersonCount: '1-4',
      Price: 213
        }
      ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
    this.calendarService.DeleteEvent(eventToDelete.Id)
      .subscribe((res) => this.openSnackBar());
  }
  updateEvent(eventToUpdate: CalendarEvent) {
    const arrayOfData = {
      Title: eventToUpdate.title,
      Name: eventToUpdate.Name,
      Phone: eventToUpdate.Phone,
      Email: eventToUpdate.Email,
      PersonCount: eventToUpdate.PersonCount,
      ArrivalTime: eventToUpdate.start,
      TourStartTime: eventToUpdate.start,
      Tour: eventToUpdate.Trip,
      Transfer: eventToUpdate.Transfer,
      Price: eventToUpdate.Trip !== 'Trip' && eventToUpdate.Trip !== null ?
      this.getPriceTo(eventToUpdate.Trip) : this.getPriceTr(eventToUpdate.Transfer),
    };
    this.calendarService.UpdateEvent(eventToUpdate.Id, arrayOfData)
    .subscribe((data: any) => {
      this.openSnackBar();
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }
  openSnackBar() {
    this.snackBar.open('Dziękujemy!', 'Dane zostały zapisane do bazy!', {
      duration: 2000,
    });
  }
  openSnackBarDelete() {
    this.snackBar.open('Dziękujemy!', 'Wycieczka została usunięta!!', {
      duration: 2000,
    });
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  saveEvent(eventToSave: CalendarEvent) {
    const arrayOfData = {
      Name: 'name',
      Title: eventToSave.title,
      Phone: eventToSave.Phone,
      Email: eventToSave.Email,
      PersonCount: eventToSave.PersonCount,
      ArrivalTime: eventToSave.start,
      TourStartTime: eventToSave.start,
      Tour: eventToSave.Trip,
      Transfer: eventToSave.Transfer,
      Price: eventToSave.Price,
      Commission: 30
    };
    this.calendarService.SaveEvent(arrayOfData)
    .subscribe((data: any) => {
      this.openSnackBar();
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }
   logOut() {
    this.authService.Logout();
  }
  ShowTripsByDate(range) {
    const endDateYear = moment(range._selecteds[1]).format('YYYY');
    const endDateMonth = moment(range._selecteds[1]).format('MM');
    const endDateDay = moment(range._selecteds[1]).format('DD');
    const endDate = moment([endDateYear, endDateMonth, endDateDay], 'YYYY-MM-DD');
    const startDateYear = moment(range._selecteds[0]).format('YYYY');
    const startDateMonth = moment(range._selecteds[0]).format('MM');
    const startDateDay = moment(range._selecteds[0]).format('DD');
    const startDate = moment([startDateYear, startDateMonth, startDateDay], 'YYYY-MM-DD');
    this.filteredForm = [];
    for (const key in this.invidualForm) {
     if (key !== undefined) {
      const dateEventYear = moment(this.invidualForm[key].start).format('YYYY');
      const dateEventMonth = moment(this.invidualForm[key].start).format('MM');
      const dateEventDay = moment(this.invidualForm[key].start).format('DD');
      const dateEvent = moment([dateEventYear, dateEventMonth, dateEventDay], 'YYYY-MM-DD');

      if (dateEvent.diff(startDate, 'days', true) >= 0 ) {
        if (dateEvent.diff(endDate, 'days', true) <= 0) {
          this.filteredForm.push(this.invidualForm[key]);

        }
      }
      }
    }
    this.events = this.filteredForm;
  }
}
