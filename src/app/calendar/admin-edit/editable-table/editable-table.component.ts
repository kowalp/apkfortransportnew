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
export class EditableTableComponent implements AfterViewInit {
  @Input() data: DataTable;
  collapse: boolean = false;

  private $unsubscribe: Subject<void> = new Subject<void>();
  @ViewChild('table', { static: true }) dataTable: ElementRef;
  constructor(private menuService: MenuService) { }

  ngAfterViewInit() {
    this.createTable();
    this.menuService.getStatusOfMenuAsObservable().pipe(takeUntil(this.$unsubscribe)).subscribe((isCollapsed: boolean) => {
      this.collapse = !isCollapsed;
    });
  }

  createTable() {
    $('#table').DataTable({
      responsive: true,
      paging: true,
      order: [[1, 'asc']],
    });
  }
}
