import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../main.service';

export interface PeriodicElement {
  name: string;
  position: number;
  price: number;
  priceMore: number;
  duration: number;
}




@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'price', 'priceMore', 'duration'];

  transfers = [];
  trips = [];
  ELEMENT_DATA: PeriodicElement[] = [];

  transferSource = new MatTableDataSource(this.transfers);
  tripSource = new MatTableDataSource(this.trips);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.GetTrips()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              name: res[key].name,
              position: res[key].id,
              price: res[key].price,
              priceMore: res[key].priceFrom5Persons,
              duration: res[key].duration,
            };
            this.trips.push(element);
          }
        }
      }
    );
    this.mainService.GetTransfers()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              position: res[key].id,
              name: res[key].name,
              price: res[key].price,
              priceMore: res[key].priceFrom5Persons,
              duration: res[key].duration,
            };
            this.transfers.push(element);
          }
        }
      }
    );
    setTimeout(() => {
      this.tripSource.sort = this.sort;
      this.transferSource.sort = this.sort;
    }, 1000);
  }

}
