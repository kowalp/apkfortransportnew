import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from 'src/app/shared/models/calendar.model';
import { TripCategory } from 'src/app/shared/Interfaces/Form.model';


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

  fields: TripCategory[] = [{
    name: 'Number Of People',
    key: 'numberOfPeople',
    inputType: 'number',
    optional: false,
    value: '',
  },
  {
    name: 'Reservation Number',
    key: 'reservationNumber',
    inputType: 'string',
    optional: true,
    value: ''
  },
  {
    name: 'Name',
    key: 'name',
    inputType: 'string',
    optional: false,
    value: ''
  },
  {
    name: 'Pick Up From',
    key: 'pickupFrom',
    inputType: 'string',
    optional: false,
    value: '',
  },
  {
    name: 'Date',
    key: 'date',
    inputType: 'date',
    optional: false,
    value: ''
  },
  {
    name: 'Phone',
    key: 'phone',
    inputType: 'phone',
    optional: false,
    value: ''
  },
  {
    name: 'Email',
    key: 'email',
    inputType: 'email',
    optional: false,
    value: localStorage.getItem('email'),
  },
];
  iloscOsob = 'numberOfPeople';
  company: string = 'Krakow welcome';
  personChange = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
  }

  logOut() {
    this.authService.Logout();
  }
}
