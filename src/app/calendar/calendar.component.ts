import { MenuService } from './../shared/services/menu.service';
import { AuthService } from '../shared/services/auth.service';
import { forkJoin, Subject } from 'rxjs';
import { CalendarService } from '../shared/services/calendar.service';
import { MatMenuTrigger } from '@angular/material/menu';
import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView } from 'angular-calendar';
import { takeUntil } from 'rxjs/operators';

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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  hotelForm: Array<CalendarEvent<{ time: any }>> = [];
  receptionistForm: Array<CalendarEvent<{ time: any }>> = [];
  invidualForm: Array<CalendarEvent<{ time: any }>> = [];
  allFroms: Array<CalendarEvent<{ time: any }>> = [];
  userRole: string;
  view: CalendarView = CalendarView.Week;
  isMaster = false;
  isDriver = false;
  doneTrip = false;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  collapse: boolean;
  activeDayIsOpen = true;
  @ViewChild('checkBox', { static: false }) checkbox: ElementRef;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;
  private $unsubscribe: Subject<void> = new Subject<void>();

  constructor(private modal: NgbModal, private calendarService: CalendarService, private authService: AuthService, private menuService: MenuService) {
  }

  ngOnInit() {
    // this.userRole = localStorage.getItem('role');
    // this.isMaster = false;
    // this.isDriver = false;
    // if (this.userRole === 'master') {
    //   this.isMaster = true;
    // } else if (this.userRole === 'driver') {
    //   this.isDriver = true;
    // }
    // this.isDriver === true ? this.view = CalendarView.Day : this.view = CalendarView.Week;
    // if (this.userRole === 'receptionist') {
    //   const nameOfTheHotel = localStorage.getItem('name');
    //   this.calendarService.getIndividualHotelData(nameOfTheHotel);
    //   this.calendarService.setIndividualFormsAsOvservable()
    //     .subscribe((res) => {
    //       this.receptionistForm = res;
    //       this.events = this.receptionistForm;
    //     });
    // } else if (this.userRole === 'master' || this.userRole === 'driver') {
    //   this.calendarService.getHotelForms();
    //   this.calendarService.setHotelFormsAsObservable()
    //     .subscribe((res) => this.invidualForm = res);
    //   this.calendarService.getIndividualFroms();
    //   this.calendarService.setIndividualFormsAsOvservable()
    //     .subscribe((res) => this.hotelForm = res);
    //   forkJoin([this.hotelForm, this.invidualForm]).subscribe(results => {
    //     this.events = results;
    //   });
    // }
    this.menuService.getStatusOfMenuAsObservable().pipe(takeUntil(this.$unsubscribe)).subscribe((isCollapsed: boolean) => {
      this.collapse = !isCollapsed;
    });
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
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
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  logOut() {
    this.authService.Logout();
  }

  onSubmit(e) {
    const arrayOfData = {
      UserEmail: localStorage.getItem('email'),
      BookingId: e.Id,
      BookingFormEmail: e.Email,
      FormType: e.TourType
    };
    this.calendarService.addBookingForDriver(arrayOfData);
  }

}

