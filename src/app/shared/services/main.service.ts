import { FormModel } from './../Interfaces/Form.model';
import { SnackBarService } from './snackBar.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { ReplaySubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class MainService {
  apiAddress = `http://51.68.143.24:5000/`;
  private $toursDetails = new ReplaySubject<any[]>(1);
  private $driversDetails = new ReplaySubject<string[]>(1);
  private $receptionistDetails = new ReplaySubject<any[]>(1);
  private $transferDetails = new ReplaySubject<any[]>(1);
  private $hotelsList = new ReplaySubject<any[]>(1);
  private $formsData = new ReplaySubject<FormModel>(1);

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

  getFormsDataAsObservable(): Observable<FormModel> {
    return this.$formsData.asObservable();
  }

  setFormsData(): void {
    this.$formsData.next({
      tripCategory: [{
        "data": [{ "key": "Kraków lotnisko", "value": "dsa" }, { "key": "111111", "value": "dsa" }],
        "name": "Transfer",
        "optional": true,
        "inputType": "dropdown",
        "key": "Transfer",
        "value": "dsa"
      }],
      numberOfPeople: {
        "data": [{ "key": "asd", "value": "dsa" },{ "key": "asd", "value": "dsa" }],
        "name": "Number Of People",
        "optional": true,
        "inputType": "dropdown",
        "key": "numberOfPeople",
        "value": "ds"
      }
    });
    // this.httpClient.get('../../data/edit-form-data.json').subscribe((data: FormModel) => );
  }

  setDriversAsObservable() {
    return this.$driversDetails.asObservable();
  }

  getDrivers(companyId: number) {
    this.httpClient.get(this.apiAddress + companyId +'/getall/driver')
      .subscribe((payload: string[]) => this.$driversDetails.next(payload));
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
