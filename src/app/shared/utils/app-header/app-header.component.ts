import { SVGIconEnum } from '../../enums/svg-icons.enum';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  @Input() activeNumber: number;
  name: string;
  collapse: boolean = false;
  readonly personIcon: SVGIconEnum = SVGIconEnum.PERSON;
  readonly dropdownIcon: SVGIconEnum = SVGIconEnum.DROPDOWNARROW;
  private $unsubscribe: Subject<void> = new Subject<void>();

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getStatusOfMenuAsObservable().pipe(takeUntil(this.$unsubscribe)).subscribe((isCollapsed: boolean) => {
      this.collapse = !isCollapsed;
    });
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}
