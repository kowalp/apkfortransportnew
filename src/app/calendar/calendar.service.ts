import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';


@Injectable()
export class CalendarService {
  apiAddress = `http://51.68.143.24:5000/`;
  private $hotelDetails = new ReplaySubject<any[]>(1);
  private $individualDetails = new ReplaySubject<any[]>(1);
  private $toursDetails = new ReplaySubject<any[]>(1);
  private $driversDetails = new ReplaySubject<any[]>(1);
  private $receptionistDetails = new ReplaySubject<any[]>(1);
  private $transferDetails = new ReplaySubject<any[]>(1);
  private $hotelsList = new ReplaySubject<any[]>(1);


  constructor(private httpClient: HttpClient) { }


  getHotelFormsForHotel(name) {
    return this.httpClient.get<any>(this.apiAddress + 'bookingforms/formsforhotel/' + name)
      .pipe(map((res) => {
        return res;
      }));
  }

  setHotelFormsAsOvservable() {
    return this.$hotelDetails.asObservable();
  }

  getHotelForms() {
    this.httpClient.get<any>(this.apiAddress + 'bookingforms/hotelbookingforms')
      .subscribe((payload) => this.$hotelDetails.next(payload));
  }

  setIndividualFormsAsOvservable() {
    return this.$individualDetails.asObservable();
  }

  getIndividualFroms() {
    this.httpClient.get<any>(this.apiAddress + 'bookingforms/individualbookingforms')
      .subscribe((payload) => this.$individualDetails.next(payload));
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
  // hotel form
  SaveEvent(EventToSave) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(`${this.apiAddress}bookingforms/createhotelbook`,
      EventToSave,
      { headers: reqHeader });
  }
  DeleteEvent(Id) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<any>(`${this.apiAddress}bookingforms/hotelFormDelete/` + Id, { headers: reqHeader });
  }
  UpdateEvent(Id, updatedBody) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(`${this.apiAddress}bookingforms/updatehotelform/` + Id, updatedBody,
      { headers: reqHeader });
  }
  // invidual Form
  SaveEventInvidual(EventToSave) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(`${this.apiAddress}bookingforms/createIndividualBook`,
      EventToSave,
      { headers: reqHeader });
  }
  DeleteEventInvidual(Id) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<any>(`${this.apiAddress}bookingforms/individualDelete/` + Id, { headers: reqHeader });
  }
  UpdateEventInvidual(Id, updatedBody) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(`${this.apiAddress}bookingforms/updateindividualform/` + Id, updatedBody,
      { headers: reqHeader });
  }
  // edit-forms
  SubmitHotel(SavingItem) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(`${this.apiAddress}hotel/createhotel`,
      SavingItem,
      { headers: reqHeader });
  }
  SubmitTrip(SavingItem) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(`${this.apiAddress}tour/createtour`,
      SavingItem,
      { headers: reqHeader });
  }
  SubmitTransfer(SavingItem) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(`${this.apiAddress}transfer/create`,
      SavingItem,
      { headers: reqHeader });
  }
  UpdateHotel(Id, updateDate) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(`${this.apiAddress}hotel/${Id}`,
      updateDate,
      { headers: reqHeader });
  }
  UpdateTrip(Id, updateDate) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(`${this.apiAddress}tour/${Id}`,
      updateDate,
      { headers: reqHeader });
  }
  UpdateTransfer(Id, updateDate) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(`${this.apiAddress}transfer/${Id}`,
      updateDate,
      { headers: reqHeader });
  }
  DeleteHotel(Id) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<any>(`${this.apiAddress}hotel/${Id}`,
      { headers: reqHeader });
  }
  DeleteDriver(email) {
    const reqHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { Email: email } };
    return this.httpClient.delete<any>(`${this.apiAddress}account/deleteuser`,
      reqHeader);
  }
  DeleteTrip(Id) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<any>(`${this.apiAddress}tour/${Id}`,
      { headers: reqHeader });
  }
  DeleteTransfer(Id) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<any>(`${this.apiAddress}transfer/${Id}`,
      { headers: reqHeader });
  }
  addBookingForDriver(updateDate) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(`${this.apiAddress}account/addBookingForDriver`,
      updateDate,
      { headers: reqHeader });
  }

}
