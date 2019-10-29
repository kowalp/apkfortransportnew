import { AppSettings } from './../models/appsettings.model';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

    public appSettings: AppSettings;
    public isAuthenicated: boolean;

    constructor() {
        this.appSettings = new AppSettings();
        this.isAuthenicated = false;
    }

    public setAppSettings(appSettings: AppSettings) {
        this.appSettings = appSettings;
    }
}
