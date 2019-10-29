import { AuthService } from './../log-in/auth.service';
import { animate, trigger, state, style, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('navOut', [
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

    trigger('navOut2', [
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
    ]),
    trigger('fadeIn', [
      state('normal', style({
        transform: 'translateY(50px)',
        opacity: 0
      })),
      state('in', style({
      })),
      transition('normal => in', [
        style({
        transform: 'translateY(50px)',
        opacity: 0
        }),
        animate(700, style({
        transform: 'translateY(20px)',
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
        transform: 'translateY(20px)',
        opacity: 0.5
        })),
        animate(300, style({
        transform: 'translateY(50px)',
        opacity: 0
        }))
      ]),

    ]),
    trigger('goUp', [
      state('normal', style({
        transform: 'translateY(0px)',
      })),
      state('in', style({
        transform: 'translateY(-30px)',
        fontWeight: '600'
      })),
      transition('normal => in', [
        style({
        transform: 'translateY(0px)',
        fontWeight: '600'
        }),
        animate(700, style({
        transform: 'translateY(-15px)'
        })),
        animate(300, style({
        transform: 'translateY(-30px)'
        }))
      ]),
      transition('in => normal', [
        style({
        transform: 'translateY(-30px)',
        }),
        animate(700, style({
        transform: 'translateY(-15px)',
        })),
        animate(300, style({
        transform: 'translateY(0px)',
        }))
        ]),
      ]),
      trigger('carUp', [
        state('normal', style({
          transform: 'translateY(20px)',
          opacity: 0

        })),
        state('in', style({
        })),
        transition('normal => in', [
          style({
          transform: 'translateY(20px)',
          opacity: 0
          }),
          animate(500, style({
          transform: 'translateY(15px)',
          opacity: 0.3
          })),
          animate(200, style({
          transform: 'translateY(0px)',
          opacity: 1
          }))
        ]),
        transition('in => normal', [
          style({
          transform: 'translateY(0px)',
          opacity: 1
          }),
          animate(500, style({
          transform: 'translateY(15px)',
          opacity: 0.3
          })),
          animate(200, style({
          transform: 'translateY(20px)',
          opacity: 0
          }))
        ]),

])
  ],
})
export class MainComponent implements OnInit {
 state = 'normal';
  state2 = 'normal';
  car = 'normal';
  car2 = 'normal';
  navout = 'normal';
  navout2 = 'normal';
  constructor(private authService: AuthService) { }
  ngOnInit() {
  }
  onAnimate() {
    this.state = 'in';
    this.car = 'in';
  }
  onAnimate2() {
    this.state2 = 'in';
    this.car2 = 'in';
  }
  onAnimateReverse() {
    this.state = 'normal';
    this.car = 'normal';
  }
  onAnimateReverse2() {
    this.state2 = 'normal';
    this.car2 = 'normal';
  }

  navOut() {
    this.navout === 'normal' ? this.navout = 'in' : this.navout = 'normal';
  }
  navOut2() {
    this.navout2 === 'normal' ? this.navout2 = 'in' : this.navout2 = 'normal';
  }
  logOut() {
    this.authService.Logout();
  }
}
