import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { MenuService } from 'src/app/shared/services/menu.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataTable } from '../shared/models/editatble-table.model';

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
  @ViewChild('table', { static: true }) dataTable: ElementRef;
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getStatusOfMenuAsObservable().pipe(takeUntil(this.$unsubscribe)).subscribe((isCollapsed: boolean) => {
      this.collapse = !isCollapsed;
    });
  }

  ngAfterViewInit() {
    this.createTable();
  }

  createTable() {
    $('#table').DataTable({
      responsive: true,
      paging: true,
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

    // TODO:open modal, emit data to the component above
  }

  editRow() {
    // TODO:open modal, emit data to the component above
  }

  deleteRow() {
    // TODO:open modal, emit data to the component above
  }
}
