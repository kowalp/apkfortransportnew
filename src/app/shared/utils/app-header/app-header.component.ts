import { SVGIconEnum } from '../../enums/svg-icons.enum';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DropdownList } from '../../models/utils.model';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  @Input() activeNumber: number;
  name: string;
  collapse: boolean = false;
  userIcon: boolean = false;
  userName: string;
  dropdownData: DropdownList[] = [{title: 'Edit Profile', link: 'profile/edit'}, {title: 'View Profile', link: 'profile'}];
  readonly personIcon: SVGIconEnum = SVGIconEnum.PERSON;
  readonly dropdownIcon: SVGIconEnum = SVGIconEnum.DROPDOWNARROW;
  private $unsubscribe: Subject<void> = new Subject<void>();

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getStatusOfMenuAsObservable().pipe(takeUntil(this.$unsubscribe)).subscribe((isCollapsed: boolean) => {
      this.collapse = !isCollapsed;
    });
    this.userName = localStorage.getItem('username') || 'Hotel X';
    //TODO: add useravatar and dropdown this.userIcon = true
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}
