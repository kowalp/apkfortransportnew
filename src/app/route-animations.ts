import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild
 } from '@angular/animations';
export const slideInAnimation =
    trigger('routeAnimations', [
         transition('* => Calendar', [
              query(':enter, :leave',
                   style({ position: 'fixed', width: '100%' }),
                   { optional: true }),
              group([
                   query(':enter', [
                       style({ transform: 'translateX(-100%)' }),
                       animate('1s ease-in-out',
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform:   'translateX(0%)'}),
                       animate('1s ease-in-out',
                       style({ transform: 'translateX(100%)' }))
                   ], { optional: true }),
              ])
         ]),
         transition('Calendar => *', [
              query(':enter, :leave',
                   style({ position: 'fixed',  width: '100%' }),
                   { optional: true }),
              group([
                   query(':enter', [
                       style({ transform: 'translateX(100%)' }),
                       animate('1s ease-in-out',
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform: 'translateX(0%)' }),
                       animate('1s ease-in-out',
                       style({ transform: 'translateX(-100%)' }))
                       ], { optional: true }),
               ])
         ]),
         transition('Home <=> ForNow', [
               query(':enter, :leave',
                   style({ position: 'fixed', width: '100%' }),
                   { optional: true }),
               group([
                   query(':enter', [
                       style({ transform: 'translateX(100%)' }),
                       animate('1s ease-in-out',
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                       style({ transform: 'translateX(0%)' }),
                       animate('1s ease-in-out',
                       style({ transform: 'translateX(-100%)' }))
                   ], { optional: true }),
               ])
         ]),
         transition('Home <=> ForLater', [
               query(':enter, :leave',
                   style({ position: 'fixed', width: '100%' }),
                   { optional: true }),
               group([
                   query(':enter', [
                       style({ transform: 'translateX(-100%)' }),
                       animate('1s ease-in-out',
                       style({ transform: 'translateX(0%)' }))
                   ], { optional: true }),
                   query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                        animate('1s ease-in-out',
                        style({ transform: 'translateX(100%)' }))
                    ], { optional: true }),
               ])
        ]),
        transition('login => Home', [
            query(':enter, :leave',
                style({ position: 'fixed', width: '100%' }),
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('1s ease-in-out',
                    style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                     style({ transform: 'translateX(0%)' }),
                     animate('1s ease-in-out',
                     style({ transform: 'translateX(100%)' }))
                 ], { optional: true }),
            ])
     ]),
     transition('Raports => *', [
        query(':enter, :leave',
            style({ position: 'fixed', width: '100%' }),
            { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('1s ease-in-out',
                style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                 style({ transform: 'translateX(0%)' }),
                 animate('1s ease-in-out',
                 style({ transform: 'translateX(100%)' }))
             ], { optional: true }),
        ])
 ]),
 transition('* => login', [
    query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
    group([
        query(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('1s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
             style({ transform: 'translateX(0%)' }),
             animate('1s ease-in-out',
             style({ transform: 'translateX(100%)' }))
         ], { optional: true }),
    ])
]),
 ]);
