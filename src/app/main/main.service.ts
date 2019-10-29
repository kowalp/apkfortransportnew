import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class MainService {
    constructor(private httpClient: HttpClient) {}
    apiAddress = `http://51.68.143.24:5000/`;
    SendForm(EventToSave) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post<any>(`${this.apiAddress}bookingforms/createhotelbook`,
        EventToSave,
        {headers: reqHeader});
    }
    // sendPdf(form): Observable<any> {
    //     let headers = new HttpHeaders();
    //     headers = headers.set('Accept', 'application/pdf');
    //     const formated = `${form.FromDateYear}/${form.FromDateMonth}/${form.FromDateDay}/${form.ToDateYear}/${form.ToDateMonth}/`;
    //     return this.httpClient.get(`${this.apiAddress}pdfgenerator/fullreport/${formated}${form.ToDateDay}`,
    //     {headers, responseType: 'blob' as 'json' }).pipe(map((res) => {
    //       return res;
    //   }));
    // }
    // sendPdfHotel(form): Observable<any> {
    //     let headers = new HttpHeaders();
    //     headers = headers.set('Accept', 'application/pdf');
    // const f = `${form.FromDateYear}/${form.FromDateMonth}/${form.FromDateDay}/${form.ToDateYear}/${form.ToDateMonth}/${form.ToDateDay}`;
    //     return this.httpClient.get(`${this.apiAddress}pdfgenerator/hotelReport/${f}/${form.ReportType}`,
    //     {headers, responseType: 'blob' as 'json' }).pipe(map((res) => {
    //       return res;
    //   }));
    // }
    // sendPdfForDriver(form): Observable<any> {
    //     let headers = new HttpHeaders();
    //     headers = headers.set('Accept', 'application/pdf');
    // const f = `${form.FromDateYear}/${form.FromDateMonth}/${form.FromDateDay}/${form.ToDateYear}/${form.ToDateMonth}/${form.ToDateDay}`;
    //     return this.httpClient.get(`${this.apiAddress}pdfgenerator/driverReport/${f}/${form.Type}/${form.DriverId}`,
    //     {headers, responseType: 'blob' as 'json' }).pipe(map((res) => {
    //       return res;
    //   }));
    // }
    GetHotels() {
        return this.httpClient.get<any[]>(this.apiAddress + 'hotel/hotels')
        .pipe(map((res) => {
            return res;
        }));
    }
    GetTrips() {
        return this.httpClient.get<any[]>(this.apiAddress + 'tour/tours')
        .pipe(map((res) => {
            return res;
        }));
    }
    GetTransfers() {
        return this.httpClient.get<any[]>(this.apiAddress + 'transfer/transfers')
        .pipe(map((res) => {
            return res;
        }));
    }
}
