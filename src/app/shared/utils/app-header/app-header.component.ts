import { SVGIconEnum } from '../../enums/svg-icons.enum';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Input() activeNumber: number;
  name: string;
  readonly personIcon: SVGIconEnum = SVGIconEnum.PERSON;
  readonly dropdownIcon: SVGIconEnum = SVGIconEnum.DROPDOWNARROW;
  constructor() { }

  ngOnInit() {
    this.name = localStorage.getItem('user-name') || 'Karamsad';
    let c = 45;

  }

}
