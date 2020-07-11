import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { MenuService } from 'src/app/shared/services/menu.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataTable } from '../shared/models/editatble-table.model';
import { SVGIconEnum } from 'src/app/shared/enums/svg-icons.enum';

@Component({
  selector: 'editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent implements AfterViewInit, OnInit {
  @Input() data: DataTable;
  @Input() editable: boolean = true;
  collapse: boolean = false;
  disableEdit: boolean = true;
  disableDelete: boolean = true;
  private $unsubscribe: Subject<void> = new Subject<void>();
  readonly arrow: SVGIconEnum = SVGIconEnum.ARROW;
  @ViewChild('table', { static: true }) dataTable: ElementRef;
  dataToDisplay: Object;
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.dataToDisplay = this.data.rows[0];
    this.menuService.getStatusOfMenuAsObservable().pipe(takeUntil(this.$unsubscribe)).subscribe((isCollapsed: boolean) => {
      this.collapse = !isCollapsed;
    });
  }

  ngAfterViewInit() {
    this.createTable();
  }

  createTable() {
    $('#table').DataTable({
      language: {
        paginate: {
          first: '',
          last: '',
          next: '<img style="height: 24px; background: transparent" src="https://img.icons8.com/fluent/48/000000/arrow.png"/>', // or '→'
          previous: '<img  style="transform: rotate(180deg);height: 24px; background: transparent" src="https://img.icons8.com/fluent/48/000000/arrow.png"/>' // or '←'
        }
      },
      responsive: true,
      paging: true,
<<<<<<< HEAD
      pagingType: 'full_numbers',
=======
>>>>>>> dcf1e1754237864fd3b23f503c5e0a432b417f11
      searching: false,
      lengthChange: false,
      order: [[1, 'asc']],
    });
  }

  selectRow(row: any) {
    row.isSelected = !row.isSelected;
    const selectedList = this.data.rows.filter(item => item.isSelected);
    this.disableEdit = selectedList.length !== 1;
    this.disableDelete = selectedList.length < 1;
  }

  addRow() {
<<<<<<< HEAD
    console.log('modal opened');
=======

>>>>>>> dcf1e1754237864fd3b23f503c5e0a432b417f11
    // TODO:open modal, emit data to the component above
  }

  editRow() {
    // TODO:open modal, emit data to the component above
  }

  deleteRow() {
    // TODO:open modal, emit data to the component above
  }
}
