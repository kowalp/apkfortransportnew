import { SVGIconEnum } from './../shared/enums/svg-icons.enum';
import { takeUntil } from 'rxjs/operators';
import { MenuService } from './../shared/services/menu.service';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  config = {
   backdropBackgroundColour: 'rgba(0,0,0,0.1)',
   primaryColour: '#50afb1',
   secondaryColour: '#50afb1',
   tertiaryColour: '#50afb1'
  };
  trips: any = [
    {title: 'Hotel X - Kraków Airport', date: '09/12/2020', numberOfPeople: 5, tripDetails: [
      {key: 'Date', value: '09/12/2020'},
      {key: 'Distance', value: '18 kilometers'},
      {key: 'Driver', value: 'Adrian Maciek'},
      {key: 'Total Price', value: '70zł'},
    ]},
    {title: 'Hotel X - Kraków Airport', date: '09/12/2020', numberOfPeople: 5},
    {title: 'Hotel X - Kraków Airport', date: '09/12/2020', numberOfPeople: 5},
    {title: 'Hotel X - Kraków Airport', date: '09/12/2020', numberOfPeople: 5},
    {title: 'Hotel X - Kraków Airport', date: '09/12/2020', numberOfPeople: 5},
    {title: 'Hotel X - Kraków Airport', date: '09/12/2020', numberOfPeople: 5},
    {title: 'Hotel X - Kraków Airport', date: '09/12/2020', numberOfPeople: 5},
    {title: 'Hotel X - Kraków Airport', date: '09/12/2020', numberOfPeople: 5},

    {title: 'Hotel X - Kraków Airport', date: '09/12/2020', numberOfPeople: 5},
  ];
  companies: any = [
    {title: 'Krakow Welcome'},
    {title: 'Krakow Welcome'},
    {title: 'Krakow Welcome'},
  ];
  loading: boolean = true;
  collapse: boolean;
  starIcon: SVGIconEnum = SVGIconEnum.STAR;
  dividerIcon: SVGIconEnum = SVGIconEnum.DIVIDER;
  private $unsubscribe: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getStatusOfMenuAsObservable().pipe(takeUntil(this.$unsubscribe)).subscribe((isCollapsed: boolean) => {
      this.collapse = !isCollapsed;

    });
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
  logOut() {
    this.authService.Logout();
  }
}
