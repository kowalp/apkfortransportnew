import { SnackBarService } from './snackBar.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { ReplaySubject, Observable } from 'rxjs';


@Injectable()
export class CalendarService {
  apiAddress = `http://51.68.143.24:5000/`;
  private $hotelDetails = new ReplaySubject<any[]>(1);
  private $individualDetails = new ReplaySubject<any[]>(1);
  private $hotelFroms = new ReplaySubject<any[]>(1);

  constructor(private httpClient: HttpClient, private snackBarService: SnackBarService) { }

  setIndividualHotelDataAsOvservable(): Observable<any> {
    return this.$hotelFroms.asObservable();
  }

  getIndividualHotelData(name) {
    this.httpClient.get<any>(this.apiAddress + 'bookingforms/formsforhotel/' + name)
      .subscribe((data) => this.$hotelFroms.next(data));
  }

  setHotelFormsAsObservable(): Observable<any> {
    return this.$hotelDetails.asObservable();
  }

  getHotelForms() {
    this.httpClient.get<any>(this.apiAddress + 'bookingforms/hotelbookingforms')
      .subscribe((payload) => this.$hotelDetails.next(payload));
  }

  setIndividualFormsAsOvservable(): Observable<any> {
    return this.$individualDetails.asObservable();
  }

  getIndividualFroms() {
    this.httpClient.get<any>(this.apiAddress + 'bookingforms/individualbookingforms')
      .subscribe((payload) => this.$individualDetails.next(payload));
  }

  // Single Hotel Update
  saveSingleHotel(SavingItem): void {
    this.httpClient.post<any>(`${this.apiAddress}hotel/createhotel`, SavingItem)
      .subscribe(() => this.onSucces('Hotel został zapisany.'))
  }

  updateSingleHotel(Id: number, updateDate: any): void {
    this.httpClient.put<any>(`${this.apiAddress}hotel/${Id}`, updateDate)
      .subscribe(() => this.onSucces('Hotel został zaktualizowny.'));
  }

  // Hotel Events

  SaveHotelEvent(EventToSave) {
    this.httpClient.post<any>(`${this.apiAddress}bookingforms/createhotelbook`,EventToSave)
    .subscribe(() => this.onSucces('Hotel został zapisany.'));
  }

  DeleteHotelEvent(Id) {
    this.httpClient.delete<any>(`${this.apiAddress}bookingforms/hotelFormDelete/` + Id)
    .subscribe(() => this.onSucces('Wycieczka dla Hotelu została usunięta.'));
  }

  UpdateHotelEvent(Id, updatedBody) {
    this.httpClient.put<any>(`${this.apiAddress}bookingforms/updatehotelform/` + Id, updatedBody)
    .subscribe(() => this.onSucces('Wycieczka dla Hotelu została zaktualizowna.'));
  }
  // Individual events

  SaveEventInvidual(EventToSave) {
    this.httpClient.post<any>(`${this.apiAddress}bookingforms/createIndividualBook`, EventToSave)
      .subscribe(() => this.onSucces('Indywidualna wycieczka został zapisana'))
  }

  DeleteEventInvidual(Id: number): void {
    this.httpClient.delete<any>(`${this.apiAddress}bookingforms/individualDelete/` + Id)
      .subscribe(() => this.onSucces('Indywidualna wycieczka został usunięta'))
  }

  UpdateEventInvidual(Id: number, updatedBody: any) {
    this.httpClient.put<any>(`${this.apiAddress}bookingforms/updateindividualform/` + Id, updatedBody)
      .subscribe(() => this.onSucces('Indywidualna wycieczka została zaktualizowna.'));
  }

  //Trip & Transfer UDP

  SubmitTour(SavingItem: any): void {
    this.httpClient.post<any>(`${this.apiAddress}tour/createtour`, SavingItem)
    .subscribe(() => this.onSucces('Trip was successfuly created!'));
  }

  SubmitTransfer(SavingItem): void {
    this.httpClient.post<any>(`${this.apiAddress}transfer/create`, SavingItem)
    .subscribe(() => this.onSucces('Transfer was successfuly created!'));
  }

  UpdateTour(Id: number, updateData: any): void {
    this.httpClient.put<any>(`${this.apiAddress}tour/${Id}`, updateData)
    .subscribe(() => this.onSucces('Trip was successfuly updated!'));
  }

  UpdateTransfer(Id: number, updateData: any): void {
    this.httpClient.put<any>(`${this.apiAddress}transfer/${Id}`, updateData)
      .subscribe(() => this.onSucces('Transfer was successfuly updated!'));
  }

  DeleteTour(Id: number): void {
    this.httpClient.delete<any>(`${this.apiAddress}tour/${Id}`)
      .subscribe(() => this.onSucces('Trip was successfully deleted.'));
  }

  DeleteTransfer(Id: number): void {
    this.httpClient.delete<any>(`${this.apiAddress}transfer/${Id}`)
      .subscribe(() => this.onSucces('Transfer was successfully deleted.'));
  }

  DeleteHotel(Id: number): void {
    this.httpClient.delete<any>(`${this.apiAddress}hotel/${Id}`)
      .subscribe(() => this.onSucces('Hotel was successfully deleted.'));
  }
  //Delete & mark as driver

  DeleteDriver(email: string): void {
    const reqHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { Email: email } };
    this.httpClient.delete<any>(`${this.apiAddress}account/deleteuser`, reqHeader)
      .subscribe(() => this.onSucces('Driver was successfully deleted..'));
  }

  addBookingForDriver(updateDate): void {
    this.httpClient.put<any>(`${this.apiAddress}account/addBookingForDriver`, updateDate)
      .subscribe(() => this.onSucces('You were marked as a driver of that trip!'));
  }

  private onSucces(text: string): void {
    this.snackBarService.openSnackBar(text);
  }
}
