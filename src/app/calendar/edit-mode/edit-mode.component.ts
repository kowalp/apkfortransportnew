import { MainService } from './../../shared/services/main.service';
import { CalendarService } from '../../shared/services/calendar.service';
import * as moment from 'moment';
import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarView
} from 'angular-calendar';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarEvent } from '../calendar.component';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit {
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
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any>;

  constructor(private calendarService: CalendarService, private authService: AuthService, private mainService: MainService) {
  }


  ngOnInit() {
    this.mainService.getTours();
    this.mainService.setToursAsObservable()
      .subscribe((res) => this.tours = res);
    this.mainService.getTransfers();
    this.mainService.setTransfersAsObservable()
      .subscribe((res) => this.transfers = res);
    this.calendarService.getHotelForms();
    this.mainService.setHotelsAsObservable()
      .subscribe((res) => this.events = res);
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
        Trip: '',
        PersonCount: '1-4',
        Price: 213
      }
    );
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
    this.calendarService.DeleteHotelEvent(eventToDelete.Id);
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
