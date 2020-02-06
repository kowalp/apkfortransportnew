import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './log-in/not-found/not-found.component';

const routes: Routes = [
  {
  path: '',
  component: AppComponent,
  // canActivateChild: [AuthGuard],
    children: [{
      path: '',
      pathMatch: 'full',
      redirectTo: 'login',
    },
    {
      path: 'main',
      loadChildren: () => import('./main/main.module').then(m => m.MainModule),
      data: {
        featureType: 'main'
      }
    },
    {
      path: 'calendar',
      loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarsModule),
      data: {
        featureType: 'calendar'
      }
    },
    {
      path: 'login',
      loadChildren: () => import('./log-in/login.module').then(m => m.LoginModule)
    },
  ]
  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
