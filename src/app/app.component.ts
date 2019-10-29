import { AppSettings } from './shared/models/appsettings.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { slideInAnimation } from './route-animations';
import { SessionService } from './shared/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  ngOnInit() { // import data apikey and authDomain
  }
  constructor(private elementRef: ElementRef, private sessionService: SessionService) {
    const native = this.elementRef.nativeElement;
    const settings = native.getAttribute('settings');
    let appSettings = new AppSettings();

    appSettings = JSON.parse(settings);

    sessionService.setAppSettings(appSettings);
}
}
