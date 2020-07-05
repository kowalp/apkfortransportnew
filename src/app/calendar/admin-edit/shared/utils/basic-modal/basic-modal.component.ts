import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
