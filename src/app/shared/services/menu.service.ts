import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable()
export class MenuService {
  private $menuStatus = new ReplaySubject<boolean>(1);

  constructor() { }

  getStatusOfMenuAsObservable(): Observable<boolean> {
    return this.$menuStatus.asObservable();
  }

  setStatusOfMenu(status: boolean): void {
    this.$menuStatus.next(status);
  }
}
