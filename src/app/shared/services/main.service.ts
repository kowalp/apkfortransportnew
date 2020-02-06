import { SnackBarService } from './snackBar.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { ReplaySubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class MainService {
  apiAddress = `http://51.68.143.24:5000/`;
  private $toursDetails = new ReplaySubject<any[]>(1);
  private $driversDetails = new ReplaySubject<any[]>(1);
  private $receptionistDetails = new ReplaySubject<any[]>(1);
  private $transferDetails = new ReplaySubject<any[]>(1);
  private $hotelsList = new ReplaySubject<any[]>(1);
  constructor(private httpClient: HttpClient, private snackBarService: SnackBarService, private formBuilder: FormBuilder) { }

  sendTripForm(EventToSave) {
    this.httpClient.post<any>(`${this.apiAddress}bookingforms/createhotelbook`, EventToSave)
      .subscribe(() => this.onSucces('Your trip was reserved successfully'));
  }

  setToursAsObservable() {
    return this.$toursDetails.asObservable();
  }

  getTours() {
    this.httpClient.get<any>(this.apiAddress + 'tour/tours').subscribe((payload) => this.$toursDetails.next(payload));
  }

  setDriversAsObservable() {
    return this.$driversDetails.asObservable();
  }

  getDrivers() {
    this.httpClient.get<any>(this.apiAddress + 'account/getall/driver')
      .subscribe((payload) => this.$driversDetails.next(payload));
  }

  setReceptionistAsObservable() {
    return this.$receptionistDetails.asObservable();
  }

  getReceptionist(): void {
    this.httpClient.get<any>(this.apiAddress + 'account/getall/receptionist')
      .subscribe((payload) => this.$receptionistDetails.next(payload));
  }

  setTransfersAsObservable() {
    return this.$transferDetails.asObservable();
  }

  getTransfers() {
    this.httpClient.get<any>(this.apiAddress + 'transfer/transfers')
      .subscribe((payload) => this.$transferDetails.next(payload));
  }

  setHotelsAsObservable() {
    return this.$hotelsList.asObservable();
  }

  getHotels() {
    this.httpClient.get<any>(this.apiAddress + 'hotel/hotels')
      .subscribe((payload) => this.$hotelsList.next(payload));
  }

  createForm(type: string): FormGroup {
    const required = Validators.required;
    switch (type) {
      case 'hotelForm':
        return this.formBuilder.group({
          name: [''],
          phone: [''],
          email: [''],
          personCount: [''],
          flightNumber: [''],
          arrivalTime: [''],
          tour: [''],
          trasnfer: [''],
          price: [''],
          commission: [''],
        });
      case 'reports':
        return this.formBuilder.group({
          fromDate: ['', required],
          toDate: ['', required],
          driverId: [''],
          raportType: [''],
        });
      default:
        break;
    }
  }
  private onSucces(text: string): void {
    this.snackBarService.openSnackBar(text);
  }
}
