import { Component, OnInit } from '@angular/core';
import { ReportsData } from './reports-content/reports.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  hotelReport = false;
  imageBlobUrl;
  url: string;
  data: ReportsData = {dateFrom: '21/21/2020', dateTo: '21/21/2020', type: 'full', driver: true};

  constructor() { }

  ngOnInit(): void {
    this.data.driver = localStorage.getItem('role') === 'master';
  }

}
