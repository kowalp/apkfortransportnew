import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuService } from '../../shared/services/menu.service';
import { SVGIconEnum } from './../../shared/enums/svg-icons.enum';
import { Company } from './../../shared/Interfaces/Company.model';

@Component({
  selector: 'app-choose-company',
  templateUrl: './choose-company.component.html',
  styleUrls: ['./choose-company.component.scss']
})
export class ChooseCompanyComponent implements OnInit, OnDestroy {
  companies: Company[] = [{
    name: 'Krakow Welcome',
    subtitle: 'KrakowWelcome was founded to provide services in tourism and to assure maximum comfort for all guest, while visiting our region. We take care about individual tourists and organized groups.',
    workingHours: '9am - 6pm',
    maxNumberOfPeople: 10,
    url: '/krakow-welcome',
    cars: [{ key: 'mercedes Vito', value: `http://yea.com.pl/wp-content/uploads/2019/04/mercedes-vito-png-6.png` }, { key: 'mercedes Benz', value: `http://yea.com.pl/wp-content/uploads/2019/04/mercedes-benz-s-class-3378362_960_720.png` }],
    rate: [{}, {}, {}, {}, {}],
  }, {
    name: 'Krakow Welcome',
    subtitle: 'KrakowWelcome was founded to provide services in tourism and to assure maximum comfort for all guest, while visiting our region. We take care about individual tourists and organized groups.',
    workingHours: '9am - 6pm',
    maxNumberOfPeople: 10,
    url: '/krakow-welcome',
    cars: [{ key: 'mercedes Vito', value: `http://yea.com.pl/wp-content/uploads/2019/04/mercedes-vito-png-6.png` }, { key: 'mercedes Benz', value: `http://yea.com.pl/wp-content/uploads/2019/04/mercedes-benz-s-class-3378362_960_720.png` }],
    rate: [{}, {}, {}, {}, {}],
  },];
  collapse: boolean;

  readonly personIcon: SVGIconEnum = SVGIconEnum.PERSON;
  readonly roadIcon: SVGIconEnum = SVGIconEnum.ROAD;
  readonly starIcon: SVGIconEnum = SVGIconEnum.QUALITYSTARS;
  private $unsubscribe: Subject<void> = new Subject<void>();
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getStatusOfMenuAsObservable().pipe(takeUntil(this.$unsubscribe)).subscribe((isCollapsed: boolean) => {
      this.collapse = !isCollapsed;
    })
  }
  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
