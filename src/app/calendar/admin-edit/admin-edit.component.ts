import { MainService } from '../../shared/services/main.service';
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
import { CalendarEvent } from '../calendar.component';

@Component({
  selector: 'admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
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

  constructor(private calendarService: CalendarService, private mainService: MainService) {
  }


  ngOnInit() {
    // this.mainService.getTours();
    // this.mainService.setToursAsObservable()
    //   .subscribe((res) => this.tours = res);
    // this.mainService.getTransfers();
    // this.mainService.setTransfersAsObservable()
    //   .subscribe((res) => this.transfers = res);
    // this.calendarService.getHotelForms();
    // this.mainService.setHotelsAsObservable()
    //   .subscribe((res) => this.events = res);
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

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter(event => event !== eventToDelete);
  //   this.calendarService.DeleteHotelEvent(eventToDelete.Id);
  // }

}
