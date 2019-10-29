import { CalendarService } from './../../calendar/calendar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../log-in/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MainService } from '../main.service';
import * as moment from 'moment';
import { User } from 'src/app/calendar/raports/raports.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-for-now',
  templateUrl: './for-now.component.html',
  styleUrls: ['./for-now.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('normal', style({
        transform: 'translateY(-90px)',
        opacity: 0
      })),
      state('in', style({
      })),
      transition('normal => in', [
        style({
        transform: 'translateY(-90px)',
        opacity: 0
        }),
        animate(700, style({
        transform: 'translateY(-50px)',
        opacity: 0.5

        })),
        animate(300, style({
        transform: 'translateY(0px)',
        opacity: 1

        }))
      ]),
      transition('in => normal', [
        style({
        transform: 'translateY(0px)',
        opacity: 1
        }),
        animate(700, style({
        transform: 'translateY(-50px)',
        opacity: 0.5

        })),
        animate(300, style({
        transform: 'translateY(-90px)',
        opacity: 0

        }))
      ]),

    ]),
    trigger('fadeIn3', [
      state('normal', style({
        marginLeft: '-117px',
        opacity: 1
      })),
      state('in', style({
      })),
      transition('normal => in', [
        style({
        marginLeft: '-117px',
        }),
        animate(400, style({
          marginLeft: '-50px',
        })),
        animate(200, style({
          marginLeft: '0px',
        }))
      ]),
      transition('in => normal', [
        style({
          marginLeft: '0px',
        }),
        animate(400, style({
          marginLeft: '-50px',
        })),
        animate(200, style({
        marginLeft: '-117px',
        }))
      ]),
    ]),

    trigger('fadeIn4', [
      state('normal', style({
        marginLeft: '-87px',
        opacity: 1
      })),
      state('in', style({
      })),
      transition('normal => in', [
        style({
        marginLeft: '-87px',
        }),
        animate(400, style({
          marginLeft: '-35px',
        })),
        animate(200, style({
          marginLeft: '0px',
        })),
        animate(700, style({
          borderBottom: '1px solid hsl(210, 50%, 40%)',
        }))
      ]),
      transition('in => normal', [
        style({
          marginLeft: '0px',
        }),
        animate(400, style({
          marginLeft: '-35px',
        })),
        animate(200, style({
        marginLeft: '-87px',
        }))
      ]),
    ])
  ]
})
export class ForNowComponent implements OnInit {
  name = 'Trip';
  name2 = 'Transfer';
  iloscOsob = 'numberOfPeople';
  state3 = 'normal';
  state4 = 'normal';
  state = 'normal';
  stateForName = 'normal';
  showTrip = 'normal';
  showTransfer = 'normal';
  showsubmit = 'normal';
  price: string;
  ppl = ['1-4', '5-8', 'MORE'];
  transfers = [];
  trips = [];
  tripsArray = [];
  transfersArray = [];
  currentValueOfTrip: string;
  currentValueOfTransfer: string;
  currentNumberOfPeople: string;
  showFlightNumber = 'normal';
  receptionistBefore: User[] = [];
  receptionist: User[] = [];
  personChange = false;
    dropdownTransfer(e) {
      this.currentValueOfTransfer = e.target.value;
      if (e.target.value !== 'Transfer') {
        this.state = 'in';
        this.showFlightNumber = 'in';
      } else {
          this.state = 'normal';
          this.showFlightNumber = 'normal';
        }
      this.getPrice();
    }
    dropdownTrip(e) {
      this.currentValueOfTrip = e.target.value;
      e.target.value !== 'Trip' ? this.state = 'in' : this.state = 'normal';
      this.showFlightNumber = 'normal';
      this.getPrice();
    }
  constructor(private mainService: MainService, private authService: AuthService, private snackBar: MatSnackBar,
              private calendarService: CalendarService, private router: Router) { }

  ngOnInit() {
      this.mainService.GetTrips()
      .subscribe((res) => {
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          const element = {
            Name: res[key].name,
            Price: res[key].price,
            PriceFrom5Persons: res[key].priceFrom5Persons,
            Duration: res[key].duration,
          };
          this.trips.push(res[key].name);
          this.tripsArray.push(element);
        }
      }
      });
      this.mainService.GetTransfers()
      .subscribe((res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              Name: res[key].name,
              Price: res[key].price,
              PriceFrom5Persons: res[key].priceFrom5Persons,
              Duration: res[key].duration,
            };
            this.transfers.push(res[key].name);
            this.transfersArray.push(element);
          }
        }
      });
      this.calendarService.getReceptionist()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              id: res[key].id,
              email: res[key].email,
              name: res[key].name,
            };
            this.receptionistBefore.push(element);
          }
        }
        setTimeout(() => {
          this.receptionist = this.receptionistBefore;
        }, 200);
      }
    );
      this.changePrice();
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
      Price: parseInt(this.price, 10) || 'contact us',
      Commision: parseInt(this.price, 10) / 20  || 'contact us',
    };
    if (form.value.trip !== 'Trip' && form.value.Transfer !== 'Transfer') {
      alert(`You have to choose one destination`);
    } else {
      console.log(values);
      this.mainService.SendForm(values)
      .subscribe(
      (res) => {
      this.openSnackBar();
      setTimeout(() => {
        this.router.navigate(['Home']);
      }, 600);
      }
      );
    }
  }
  onAnimate() {
    this.state3 === 'normal' ? this.state3 = 'in' : this.state3 = 'normal';
  }
  onAnimate2() {
    this.state4 === 'normal' ? this.state4 = 'in' : this.state4 = 'normal';
  }
  pickARide(e) {
    e.target.value === 'Trip' ? this.showTrip = 'in' : this.showTrip = 'normal';
    e.target.value === 'Transfer' ? this.showTransfer = 'in' : this.showTransfer = 'normal';
  }
  showSubmit(e) {
    this.currentNumberOfPeople = e.target.value;
    e.target.value !== 'numberOfPeople' ? this.showsubmit = 'in' : this.showsubmit = 'normal';
    this.getPrice();
  }
  logOut() {
    this.authService.Logout();
  }
  getPrice() {
      for (const key of this.transfersArray) {
        if (this.currentNumberOfPeople !== undefined && this.currentNumberOfPeople !== 'numberOfPeople') {
        if (this.currentValueOfTransfer !== undefined && this.showTransfer === 'in') {
          if (key.Name === this.currentValueOfTransfer) {
            if (this.currentNumberOfPeople === '1-4') {
            return this.price = `${key.Price} zł`;
            } else if (this.currentNumberOfPeople === '5-8') {
              return this.price = `${key.PriceFrom5Persons} zł`;
            } else {
              return this.price = 'Contact Us';
            }
          }
        }
      } else {
        return this.price = ``;
      }
    }
      for (const key of this.tripsArray) {
      if (this.currentNumberOfPeople !== undefined && this.currentNumberOfPeople !== 'numberOfPeople') {
        if (this.currentValueOfTrip !== undefined && this.showTrip === 'in') {
          if (key.Name === this.currentValueOfTrip) {
            if (this.currentNumberOfPeople === '1-4') {
              return this.price = `${key.Price} zł`;
            } else if (this.currentNumberOfPeople === '5-8') {
              return this.price = `${key.PriceFrom5Persons} zł`;
            } else {
              return this.price = 'Contact Us';
            }
        }
      }
    } else {
      return this.price = ``;
    }
  }
  }
  openSnackBar() {
    this.snackBar.open('Dziękujemy!', 'Wycieczka została zarezerowana!', {
      duration: 2000,
    });
  }
  changePrice() {
    const email = localStorage.getItem('email');
    for (const key in this.receptionist) {
      if (this.receptionist[key].email === email) {
        localStorage.setItem('name', this.receptionist[key].name);
      }
    }
    const name = localStorage.getItem('name');
    if (name === 'Hotel Imperial') {
      for (const key in this.transfersArray) {
        if (this.transfersArray[key].Name !== undefined) {
          if (this.transfersArray[key].Name === 'Airport Balice') {
            this.transfersArray[key].Price = 110;
            this.transfersArray[key].PriceFrom5Persons = 160;
          }
          if (this.transfersArray[key].Name === 'Airport Katowice') {
            this.transfersArray[key].Price = 500;
            this.transfersArray[key].PriceFrom5Persons = 600;
          }
          if (this.transfersArray[key].Name === 'Airport Warszawa/Okęcie') {
            this.transfersArray[key].Price = 1300;
            this.transfersArray[key].PriceFrom5Persons = 1700;
          }
          if (this.transfersArray[key].Name === 'Airport Warszawa/Okęcie') {
            this.transfersArray[key].Price = 1300;
            this.transfersArray[key].PriceFrom5Persons = 1700;
          }
          if (this.tripsArray[key].Name === 'Wieliczka Salt Mine') {
            this.tripsArray[key].Price = 350;
            this.tripsArray[key].PriceFrom5Persons = 400;
          }
          if (this.tripsArray[key].Name === 'Oświęcim Auschwitz Bierkenau') {
            this.tripsArray[key].Price = 500;
            this.tripsArray[key].PriceFrom5Persons = 600;
          }
          if (this.tripsArray[key].Name === 'Kraków Round Trip') {
            this.tripsArray[key].Price = 300;
            this.tripsArray[key].PriceFrom5Persons = 400;
          }
          if (this.tripsArray[key].Name === 'Dunajec River Rafting') {
            this.tripsArray[key].Price = 600;
            this.tripsArray[key].PriceFrom5Persons = 700;
          }
          if (this.tripsArray[key].Name === 'Tatra Mountains') {
            this.tripsArray[key].Price = 600;
            this.tripsArray[key].PriceFrom5Persons = 700;
          }
          if (this.tripsArray[key].Name === 'Częstochowa Sanctuary') {
            this.tripsArray[key].Price = 600;
            this.tripsArray[key].PriceFrom5Persons = 700;
          }
          if (this.tripsArray[key].Name === 'A Long John Paul II Trip') {
            this.tripsArray[key].Price = 550;
            this.tripsArray[key].PriceFrom5Persons = 650;
          }
        }
      }
    }
  }
}
