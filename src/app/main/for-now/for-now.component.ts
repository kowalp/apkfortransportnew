import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from '../../shared/services/main.service';
import * as moment from 'moment';
import { User } from 'src/app/shared/models/calendar.model';

@Component({
  selector: 'app-for-now',
  templateUrl: './for-now.component.html',
  styleUrls: ['./for-now.component.scss'],
})
export class ForNowComponent implements OnInit {
  tripsData: any;
  transfersData: any;
  receptionist: any;

  constructor(private mainService: MainService, private authService: AuthService) { }

  ngOnInit() {
    this.mainService.getTours();
    this.mainService.setToursAsObservable()
      .subscribe((res) => this.tripsData = res);
    this.mainService.getTransfers();
    this.mainService.setTransfersAsObservable()
      .subscribe((res) => this.transfersData = res);
    this.mainService.getReceptionist();
    this.mainService.setReceptionistAsObservable()
      .subscribe((res) => this.receptionist = res);
  }

  onSubmit(form: NgForm) {
    const values = {
      Name: localStorage.getItem('name'),
      PersonCount: form.value.people,
      Email: localStorage.getItem('email'),
      ArrivalTime: new Date(moment().format()),
      Tour: form.value.trip,
      Transfer: form.value.Transfer,
      FlightNumber: form.value.flightNumber,
      // Price: parseInt(this.price, 10) || 'contact us',
      // Commision: parseInt(this.price, 10) / 20 || 'contact us',
    };
    if (form.value.trip !== 'Trip' && form.value.Transfer !== 'Transfer') {
      alert(`You have to choose one destination`);
    } else {
      this.mainService.sendTripForm(values);
    }
  }
  logOut() {
    this.authService.Logout();
  }
}
