import { SVGIconEnum } from './../../enums/svg-icons.enum';
import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Input() active: number;
  menuIcon: SVGIconEnum = SVGIconEnum.MENU;
  isCollapsed: boolean = true;
  menuItems: Array<any> = [
    { value: 'MAIN', routing: '/main' },
    { value: 'CALENDAR', routing: '/calendar' },
    { value: 'BOOK A RIDE', routing: '/main/choose-company' },
    { value: 'REPORTS', routing: '/calendar/reports' },
  ];
  readonly icons: SVGIconEnum[] = [
    SVGIconEnum.MAIN,
    SVGIconEnum.CALENDAR,
    SVGIconEnum.RIDE,
    SVGIconEnum.REPORTS,
];
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuItems[this.active].active = true;
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
    this.menuService.setStatusOfMenu(this.isCollapsed);
  }
}
