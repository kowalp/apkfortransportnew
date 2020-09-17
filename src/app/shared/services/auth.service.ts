import { SnackBarService } from './snackBar.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  apiAddress = `https://localhost:5001/`;

  constructor(private router: Router, private httpClient: HttpClient, private snackBarService: SnackBarService) { }

  LogIn(email: string, password: string): Observable<any> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.httpClient.post<any>(this.apiAddress + 'api/User', {
      Email: email,
      Password: password
    }, { headers: reqHeader });
  }

  Logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  Register(form) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True'  });
    this.httpClient.post<any>(this.apiAddress + 'api/user', form, { headers: reqHeader }).subscribe(() => {
      this.snackBarService.openSnackBar('You were register successfully!');
    })
  }

  ChangePassword(form) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpClient.post<any>(this.apiAddress + 'account/changepassword', form, { headers: reqHeader });
    this.snackBarService.openSnackBar(`Your password was changed successfully!`);
  }

  getMaster() {
    this.httpClient.get<any>(this.apiAddress + 'account/getall/master')
      .pipe(map((res) => {
        return res;
      }));
  }

}
