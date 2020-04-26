import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-content',
  templateUrl: './reports-content.component.html',
  styleUrls: ['./reports-content.component.scss']
})
export class ReportsContentComponent implements OnInit {
  @Input() role: string;
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
