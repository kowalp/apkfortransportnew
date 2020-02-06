import { Component, OnInit, Input } from '@angular/core';
import { SVGIconEnum } from '../../enums/svg-icons.enum';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'svg-icon',
  templateUrl: './svg-icons.component.html',
  styleUrls: ['./svg-icons.component.scss']
})
export class SvgIconsComponent implements OnInit {

  @Input() iconType: SVGIconEnum;
  iconEnum = SVGIconEnum;
  constructor() { }

  ngOnInit() {
  }

}
