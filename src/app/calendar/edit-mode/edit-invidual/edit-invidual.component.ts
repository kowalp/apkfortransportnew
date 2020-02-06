import { MainService } from './../../../shared/services/main.service';
import * as moment from 'moment';
import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarView
} from 'angular-calendar';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CalendarService } from '../../../shared/services/calendar.service';
import { CalendarEvent } from '../../calendar.component';

@Component({
  selector: 'app-edit-invidual',
  templateUrl: './edit-invidual.component.html',
  styleUrls: ['./edit-invidual.component.scss']
})
export class EditInvidualComponent implements OnInit {
  @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any>;
  invidualForm: Array<CalendarEvent<{ time: any }>> = [];
  filteredForm: Array<CalendarEvent<{ time: any }>> = [];
  tours = [];
  transfers = [];
  ppl = ['1-4', '5-8', 'MORE'];
  view: CalendarView = CalendarView.Week;
  range;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [
  ];

  activeDayIsOpen = true;

  constructor(
    private modal: NgbModal,
    private mainService: MainService,
    private calendarService: CalendarService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.mainService.setToursAsObservable().subscribe((data) => this.tours = data);
    this.mainService.setTransfersAsObservable().subscribe((data) => this.transfers = data);
    this.calendarService.setIndividualFormsAsOvservable().subscribe((data) => {
      this.events = data;
    })
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


  addEvent(): void {
    this.events.push(
      {
        start: new Date(moment().format()),
        Name: 'Test',
        title: 'Kraków round Trip',
        Email: 'dsa@o2.pl',
        Phone: '000000000',
        end: new Date(moment().add(60, 'm').toDate()),
        Transfer: '',
        Comment: '',
        PickupFrom: '',
        FlightNumber: 'ese123',
        Trip: '',
        PersonCount: '1-4',
        Price: 213
      });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    // this.events = this.events.filter(event => event !== eventToDelete);
    this.calendarService.DeleteEventInvidual(eventToDelete.Id);
    this.calendarService.getIndividualFroms();
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
      Comment: eventToUpdate.Comment,
      PickupFrom: eventToUpdate.PickupFrom,
      FlightNumber: eventToUpdate.FlightNumber,
      Transfer: eventToUpdate.Transfer,
      Price: '213'
    };
    this.calendarService.UpdateEventInvidual(eventToUpdate.Id, arrayOfData);
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  saveEvent(eventToSave: CalendarEvent) {
    const arrayOfData = {
      Name: eventToSave.Name,
      Title: eventToSave.title,
      Phone: eventToSave.Phone,
      Email: eventToSave.Email,
      PersonCount: eventToSave.PersonCount,
      ArrivalTime: eventToSave.start,
      TourStartTime: eventToSave.start,
      Comment: eventToSave.Comment,
      PickupFrom: eventToSave.PickupFrom,
      FlightNumber: eventToSave.FlightNumber,
      Tour: eventToSave.Trip,
      Transfer: eventToSave.Transfer,
      Price: eventToSave.Price,
    };
    this.calendarService.SaveEventInvidual(arrayOfData);
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

        if (dateEvent.diff(startDate, 'days', true) >= 0) {
          if (dateEvent.diff(endDate, 'days', true) <= 0) {
            this.filteredForm.push(this.invidualForm[key]);

          }
        }
      }
    }
    this.events = this.filteredForm;
  }
}
