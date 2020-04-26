import { MainService } from '../../../shared/services/main.service';
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
import { CalendarService } from '../../../shared/services/calendar.service';
import { CalendarEvent } from '../../calendar.component';
import { TourData, DataTable } from '../shared/models/editatble-table.model';
import { KeyValueObject } from 'src/app/shared/models/calendar.model';
import { columns } from '../shared/data/columns.data';

@Component({
  selector: 'edit-individual',
  templateUrl: './edit-individual.component.html',
  styleUrls: ['./edit-individual.component.scss']
})
export class EditIndividualComponent implements OnInit {
  individualColumns: KeyValueObject[] = columns.individual;
  individualRows: TourData[] = [{
    "arrivalTime": new Date(),
    "name": "Transfer",
    "phone": "533535233",
    "email": "das@das.pl",
    "pickUpFrom": "1231dsa",
    "personCount": "dsa",
    "tour": "d213",
    "transfer": "312das",
    "price": 323,
    "comment": "312dasf",
  }, {
    "arrivalTime": new Date(),
    "name": "Transfer",
    "phone": "533535233",
    "email": "das@das.pl",
    "pickUpFrom": "1231dsa",
    "personCount": "dsa",
    "tour": "d213",
    "transfer": "312das",
    "price": 323,
    "comment": "312dasf",
  }];
  individualData: DataTable;
  constructor(
    private modal: NgbModal,
    private mainService: MainService,
    private calendarService: CalendarService,
    // private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.individualData = {rows: this.individualRows, columns: this.individualColumns};
    // this.mainService.setToursAsObservable().subscribe((data) => this.tours = data);
    // this.mainService.setTransfersAsObservable().subscribe((data) => this.transfers = data);
  }

  // ShowTripsByDate(range) {
  //   const endDateYear = moment(range._selecteds[1]).format('YYYY');
  //   const endDateMonth = moment(range._selecteds[1]).format('MM');
  //   const endDateDay = moment(range._selecteds[1]).format('DD');
  //   const endDate = moment([endDateYear, endDateMonth, endDateDay], 'YYYY-MM-DD');
  //   const startDateYear = moment(range._selecteds[0]).format('YYYY');
  //   const startDateMonth = moment(range._selecteds[0]).format('MM');
  //   const startDateDay = moment(range._selecteds[0]).format('DD');
  //   const startDate = moment([startDateYear, startDateMonth, startDateDay], 'YYYY-MM-DD');
  //   this.filteredForm = [];
  //   for (const key in this.invidualForm) {
  //     if (key !== undefined) {
  //       const dateEventYear = moment(this.invidualForm[key].start).format('YYYY');
  //       const dateEventMonth = moment(this.invidualForm[key].start).format('MM');
  //       const dateEventDay = moment(this.invidualForm[key].start).format('DD');
  //       const dateEvent = moment([dateEventYear, dateEventMonth, dateEventDay], 'YYYY-MM-DD');

  //       if (dateEvent.diff(startDate, 'days', true) >= 0) {
  //         if (dateEvent.diff(endDate, 'days', true) <= 0) {
  //           this.filteredForm.push(this.invidualForm[key]);

  //         }
  //       }
  //     }
  //   }
  // }
}
