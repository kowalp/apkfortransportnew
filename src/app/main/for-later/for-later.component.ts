import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from 'src/app/shared/models/calendar.model';


@Component({
  selector: 'app-for-later',
  templateUrl: './for-later.component.html',
  styleUrls: ['./for-later.component.scss'],
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
export class ForLaterComponent implements OnInit {
  state3 = 'normal';
  state4 = 'normal';
  iloscOsob = 'numberOfPeople';
  state = 'normal';
  stateForName = 'normal';
  stateForSubmit = 'normal';
  showTrip = 'normal';
  showTransfer = 'normal';
  people = 'normal';
  price: string;
  ppl = ['1-4', '5-8', 'MORE'];
  showFlightNumber = 'normal';
  currentValueOfTrip: string;
  currentValueOfTransfer: string;
  currentNumberOfPeople: string;
  myDate = new Date();
  receptionist: User[] = [];
  public min = new Date(2019, 4, 2, 10, 30);
  public max = new Date(2020, 1, 3, 23, 59);
  personChange = false;

  constructor(private authService: AuthService) { }

  dropdownTransfer(e) {
    this.currentValueOfTransfer = e.target.value;
    if (e.target.value !== 'Transfer') {
      this.state = 'in';
      this.showFlightNumber = 'in';
    } else {
      this.state = 'normal';
      this.showFlightNumber = 'normal';
    }
  }
  dropdownTrip(e) {
    this.currentValueOfTrip = e.target.value;
    e.target.value !== 'Trip' ? this.state = 'in' : this.state = 'normal';
    this.showFlightNumber = 'normal';
  }
  dropdownPpl(e) {
    e.target.value !== 'numberOfPeople' ? this.stateForName = 'in' : this.stateForName = 'normal';
    this.currentNumberOfPeople = e.target.value;
  }
  pickARide(e) {
    e.target.value === 'Trip' ? this.showTrip = 'in' : this.showTrip = 'normal';
    e.target.value === 'Transfer' ? this.showTransfer = 'in' : this.showTransfer = 'normal';
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
  }

  logOut() {
    this.authService.Logout();
  }
}
