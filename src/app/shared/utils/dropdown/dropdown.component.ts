import { Component, OnInit, Input } from '@angular/core';
import { SVGIconEnum } from '../../enums/svg-icons.enum';
import { DropdownList } from '../../models/utils.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() data: DropdownList;
  collapsed: boolean = false;
  readonly dotsIcon: SVGIconEnum = SVGIconEnum.MORE;
  constructor() { }

  ngOnInit() {
  }

  collapseDropdown(): void {
    this.collapsed = !this.collapsed;
  }
}
