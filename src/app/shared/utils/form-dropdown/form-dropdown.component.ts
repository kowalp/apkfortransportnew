import { SVGIconEnum } from './../../enums/svg-icons.enum';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, NgZone, ElementRef } from '@angular/core';
import { KeyValueObject, SelectedList } from '../../models/calendar.model';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
@Component({
  selector: 'form-dropdown',
  templateUrl: './form-dropdown.component.html',
  styleUrls: ['./form-dropdown.component.scss']
})
export class FormDropdownComponent implements OnInit, OnDestroy {
  @Input() data: KeyValueObject[];
  @Input() selectedOption: any;
  @Input() selectedList: SelectedList;
  @Input() defaultTitle: string;
  expandMenu: boolean;
  resultsList: KeyValueObject[];
  activeValue: boolean = false;
  readonly dropdownArrowIcon: SVGIconEnum = SVGIconEnum.DROPDOWNARROW;
  private $unsubscribe: Subject<void> = new Subject<void>();
  @Output() inputValue: EventEmitter<KeyValueObject> = new EventEmitter();

  constructor(private zone: NgZone, private element: ElementRef) { }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes)
  //   if (changes.selectedList) {
  //     this.resultsList = this.filterResults(this.data, this.selectedList.list);
  //   }
  //   if (changes.data) {
  //     this.resultsList = this.filterResults(this.data, this.selectedList ? this.selectedList.list : []);
  //   }
  // }

  ngOnInit() {
    this.expandMenu = false;
    this.resultsList = this.data;
    this.onOutsideClick();
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  toggleDropdown(): void {
    if (this.selectedOption) {
      this.activeValue = true;
    }
    this.expandMenu = !this.expandMenu;
  }

  chooseOption(result: KeyValueObject): void {
    this.selectedOption = result;
    this.inputValue.emit(result);
    this.activeValue = true;
    this.expandMenu = false;
  }

  private onOutsideClick(): void {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'click')
        .pipe(takeUntil(this.$unsubscribe), filter(() => this.expandMenu))
        .subscribe((event) => {
          this.zone.run(() => {
            this.resetInput(event);
          }
          );
        });
    });
  }

  private resetInput(event) {
    if (!this.element.nativeElement.contains(event.target)) {
      this.expandMenu = false;
    }
  }

  private filterResults(allResults: KeyValueObject[], selectedResults: KeyValueObject[]): KeyValueObject[] {
    if (selectedResults && selectedResults.length) {
      const filteredResults = allResults.filter(el => {
        for (const selected of selectedResults) {
          if (el.value === selected.value) {
            return false;
          }
        }
        return true;
      });
      return filteredResults;
    } else {
      return allResults;
    }
  }
}
